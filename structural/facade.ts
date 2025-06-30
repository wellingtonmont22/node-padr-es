class ValidadorCartao {
  validar(numero: string): boolean {
    return numero.length === 16;
  }
}

class VerificadorSaldo {
  verificar(limite: number): boolean {
    return limite > 100;
  }
}

class RegistroTransacao {
  registrar(dados: any) {
    console.log("Transação registrada:", dados);
  }
}

class Notificador {
  enviarEmail(email: string, msg: string) {
    console.log(`Enviado para ${email}: ${msg}`);
  }
}

class ReciboService {
  gerar(): string {
    return "RECIBO#2025-001";
  }
}

class PagamentoFacade {
  private validador = new ValidadorCartao();
  private verificador = new VerificadorSaldo();
  private registro = new RegistroTransacao();
  private notificador = new Notificador();
  private recibo = new ReciboService();

  processarPagamento(dados: {
    numeroCartao: string;
    limite: number;
    email: string;
  }): string {
    if (!this.validador.validar(dados.numeroCartao)) {
      throw new Error("Cartão inválido");
    }

    if (!this.verificador.verificar(dados.limite)) {
      throw new Error("Saldo insuficiente");
    }

    this.registro.registrar(dados);
    this.notificador.enviarEmail(dados.email, "Pagamento aprovado");
    return this.recibo.gerar();
  }
}

const pagamento = new PagamentoFacade();

const recibo = pagamento.processarPagamento({
  numeroCartao: "1234567812345678",
  limite: 500,
  email: "cliente@exemplo.com"
});

console.log("Pagamento finalizado! Recibo:", recibo);
