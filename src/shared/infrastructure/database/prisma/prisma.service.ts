import { Injectable, OnModuleInit, INestApplication, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

/**
 * Serviço que gerencia a conexão com o banco de dados Prisma.
 *
 * Este serviço estende a classe `PrismaClient` e implementa as interfaces `OnModuleInit` e
 * `OnModuleDestroy` para garantir que a conexão com o banco de dados seja estabelecida
 * no início da aplicação e encerrada ao final.
 */
@Injectable()
export class PrismaService extends PrismaClient
implements OnModuleInit, OnModuleDestroy
{
  /**
   * Método executado quando o módulo é destruído.
   *
   * Encerra a conexão com o banco de dados utilizando o método `$disconnect()`.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Método executado quando o módulo é inicializado.
   *
   * Estabelece a conexão com o banco de dados utilizando o método `$connect()`.
   */
  async onModuleInit() {
    await this.$connect();
  }
}
