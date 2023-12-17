import { Account, Prisma, PrismaClient, TransactionType, TransferStatus } from "@prisma/client";
import { httpResponses, ServiceResponse } from "@tonictech/common";
import prisma from "../../lib/prisma";

export default class AccountPGService {
  prisma: PrismaClient;
  account?: Account;

  response?: ServiceResponse;

  constructor(account?: Account) {
    this.prisma = prisma;
    this.account = account;
  }

  async createUserAccount({accountNumber, bankId, userId}: {accountNumber: string, bankId: string, userId: string}){
    try {
      this.account = await this.prisma.account.create({
        data: {
          accountNumber,
          bankId,
          userId
        },
        include: {
          bank: true,
          user: {
            select: {
              username: true,
              name: true,
              email: true,
              id: true,
            }
          },
          _count: {
            select: {
              receivedTransfers: true,
              sentTransfers: true,
              transactions: true,
            }
          }
        }
      })
      this.response = httpResponses.OK({message: 'Account created successfully', data: this.account})
    } catch (error: any) {
      console.log({error})
      this.response = httpResponses.InternalServerError({message: 'error creating account', data: null, error, errMessage: error.message});
    }
    return this
  }

  async getAccountDetailsById({accountId}: {accountId: string}){
    try {
      const account = await this.prisma.account.findUnique({
        where: {
          id: accountId
        },
        include: {
          bank: true,
          user: true,
          _count: {
            select: {
              receivedTransfers: true,
              sentTransfers: true,
              transactions: true,
            }
          }
        }
      })
      this.account = account ? account : undefined
      this.response = account ? httpResponses.OK({data: account}) : httpResponses.NotFound({});
    } catch (error: any) {
      console.log({error})
      this.response = httpResponses.InternalServerError({message: 'error getting account details', data: null, error, errMessage: error.message});
    }
    return this
  }

  async findBankAccount({bankId, accountNumber}: {bankId: string, accountNumber: string}) {
    try {
      const account = await this.prisma.account.findFirst({
        where: {
          AND: [
            {
              accountNumber
            },
            {
              bankId
            }
          ]
        },
        include: {
          user: {
            select: {
              username: true,
              name: true,
              email: true,
              id: true,
            }
          },
          bank: true,
        }
      });
      this.account = account ? account : undefined
      this.response = account ? httpResponses.OK({data: account}) : httpResponses.NotFound({});
    } catch (error: any) {
      console.log({error})
      this.response = httpResponses.InternalServerError({message: 'error finding account', data: null, error, errMessage: error.message});
    }
  }

  async creditAccount(accountId: string, amount: number, description: string, type: TransactionType = 'CREDIT', transferId: string | null = null) {
    try {
      const creditTxn = await this.prisma.transaction.create({
        data: {
          accountId,
          description,
          amount,
          transferId,
          type,
        }
      });
      const balance = await this.prisma.account.update({
        where: {
          id: accountId
        },
        data: {
          balance: {
            increment: +amount
          }
        }
      });
      if (creditTxn) {
        return { data: { txn: creditTxn, balance }, error: null, code: 200 };
      }
      return { data: null, error: 'Error crediting account', code: 400 };
    } catch (error) {
      return { data: null, error, code: 500 };
    }
  }

  async debitAccount(accountId: string, amount: number, description: string, type: TransactionType = 'DEBIT', transferId: string | null = null) {
    try {
      const debitTxn = await this.prisma.transaction.create({
        data: {
          accountId,
          description,
          amount,
          transferId,
          type,
        }
      });
      const balance = await this.prisma.account.update({
        where: {
          id: accountId
        },
        data: {
          balance: {
            increment: -amount
          }
        }
      });
      if (debitTxn) {
        return { data: { txn: debitTxn, balance }, error: null, code: 200 };
      }
      return { data: null, error: 'Error debiting account', code: 400 };
    } catch (error: any) {
      return { data: null, error, code: 500 };
    }
  }

  async initiateTransfer(
    originAccountId: string,
    destinationAccountId: string,
    amount: number,
    description: string | undefined
  ) {
    try {
      const newTransfer = await this.prisma.transfer.create({
        data: {
          originAccountId,
          destinationAccountId,
          description,
          amount,
          status: 'PENDING'
        }
      });
      if (newTransfer) {
        return { data: newTransfer, error: null, code: 200 };
      }
      return { data: null, error: 'Error initiating transfer', code: 400 };
    } catch (error: any) {
      return { data: null, error, code: 500 };
    }
  }

  async updateTransferStatus(transferId: string, status: TransferStatus) {
    try {
      const updatedTransfer = await this.prisma.transfer.update({
        where: {
          id: transferId
        },
        data: {
          status,
        },
        include: {
          destinationAccount: {
            include: {
              user: {
                select: {
                  username: true,
                  name: true,
                  id: true,
                }
              },
              bank: true
            },
          },
          originAccount: {
            include: {
              user: {
                select: {
                  username: true,
                  name: true,
                  id: true,
                }
              },
              bank: true
            }
          }
        }
      });
      if (updatedTransfer) {
        return { data: updatedTransfer, error: null, code: 200 };
      }
      return { data: null, error: 'Error updating transfer status', code: 400 };
    } catch (error: any) {
      return { data: null, error, code: 500 };
    }
  }

  async getAccountTransactions(accountId: string, page = 1, limit = 20) {
    try {
      const transactions = await this.prisma.transaction.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: {
          accountId
        },
        include: {
          transfer: true
        }
      });
      const total = await this.prisma.transaction.count({
        where: {
          accountId
        },
      });
      const pages = Math.ceil(total / limit) || 1;
      const prev = pages > 1 && page <= pages && page > 0 ? page - 1 : null;
      const next = pages > 1 && page < pages && page > 0 ? page + 1 : null;
      return {
        data: {
          data: transactions, pages, page, prev, next, total, limit,
        },
        error: null,
        code: 200
      };
    } catch (error: any) {
      console.log({ error });
      return { data: null, error, code: 500 };
    }
  }

  async searchAccountTransactions(
    accountId: string,
    startDate: string,
    endDate: string,
    page = 1,
    limit = 20
  ) {
    try {
      const transactions = await this.prisma.transaction.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: {
          AND: [
            {
              accountId,
            },
            {
              createdAt: {
                gte: new Date(startDate),
                lte: new Date(endDate),
              }
            }
          ]
        },
        include: {
          transfer: true
        }
      });
      const total = await this.prisma.transaction.count({
        where: {
          AND: [
            {
              accountId,
            },
            {
              createdAt: {
                gte: new Date(startDate),
                lte: new Date(endDate),
              }
            }
          ]
        },
      });
      const pages = Math.ceil(total / limit) || 1;
      const prev = pages > 1 && page <= pages && page > 0 ? page - 1 : null;
      const next = pages > 1 && page < pages && page > 0 ? page + 1 : null;
      return {
        data: {
          data: transactions,
          searchTerm: { startDate, endDate },
          pages,
          page,
          prev,
          next,
          total,
          limit
        },
        error: null,
        code: 200
      };
    } catch (error: any) {
      console.log({ error });
      return { data: null, error, code: 500 };
    }
  }

  async getAllAccounts(page = 1, limit = 25) {
    try {
      const accounts = await this.prisma.account.findMany({
        take: limit,
        skip: (page - 1) * limit,
        include: {
          user: {
            select: {
              username: true,
              email: true,
              name: true,
              id: true,
            }
          },
          bank: true
        }
      });
      const total = await this.prisma.account.count();
      const pages = Math.ceil(total / limit) || 1;
      const prev = pages > 1 && page <= pages && page > 0 ? page - 1 : null;
      const next = pages > 1 && page < pages && page > 0 ? page + 1 : null;
      return {
        data: {
          data: accounts, pages, page, prev, next, total, limit
        },
        error: null,
        code: 200
      };
    } catch (error: any) {
      console.log({ error });
      return { data: null, error, code: 500 };
    }
  }

  async searchAllAccounts(searchTerm: string, page = 1, limit = 25) {
    try {
      const accounts = await this.prisma.account.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: {
          OR: [
            {
              user: {
                OR: [
                  {
                    username: {
                      contains: searchTerm,
                      mode: 'insensitive'
                    },
                    name: {
                      contains: searchTerm,
                      mode: 'insensitive'
                    },
                    email: {
                      contains: searchTerm,
                      mode: 'insensitive'
                    }
                  }
                ]
              }
            },
            {
              bank: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive'
                }
              }
            }
          ]
        },
        include: {
          user: true,
          bank: true,
          _count: {
            select: {
              receivedTransfers: true,
              sentTransfers: true,
              transactions: true
            }
          }
        }
      });
      const total = await this.prisma.account.count({
        where: {
          OR: [
            {
              user: {
                OR: [
                  {
                    username: {
                      contains: searchTerm,
                      mode: 'insensitive'
                    },
                    name: {
                      contains: searchTerm,
                      mode: 'insensitive'
                    },
                    email: {
                      contains: searchTerm,
                      mode: 'insensitive'
                    }
                  }
                ]
              }
            },
            {
              bank: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive'
                }
              }
            }
          ]
        },
      });
      const pages = Math.ceil(total / limit) || 1;
      const prev = pages > 1 && page <= pages && page > 0 ? page - 1 : null;
      const next = pages > 1 && page < pages && page > 0 ? page + 1 : null;
      return {
        data: {
          data: accounts, searchTerm, pages, page, prev, next, total, limit
        },
        error: null,
        code: 200
      };
    } catch (error: any) {
      console.log({ error });
      return { data: null, error, code: 500 };
    }
  }
}
