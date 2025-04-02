import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super()
  }

  async onModuleInit() {
    let retries = 5;
    while (retries > 0) {
      try {
        await this.$connect();
        console.log('Successfully connected to the database');
        break;
      } catch (error) {
        console.error(
          `Failed to connect to database, retrying... (${retries} attempts left)`,
        );
        console.error(error);
        retries -= 1;
        // Wait 5 seconds before retrying
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
