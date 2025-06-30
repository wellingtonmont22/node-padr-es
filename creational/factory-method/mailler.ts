interface Mailer {
    send(to: string, subject: string, body: string): void;
}

class SendGridMailer implements Mailer {
    send(to: string, subject: string, body: string): void {
        console.log(`SendGrid: Sending email to ${to} with subject "${subject}" and body "${body}"`);
    }
}

class ResendMailer implements Mailer {
    send(to: string, subject: string, body: string): void {
        console.log(`Resend: Sending email to ${to} with subject "${subject}" and body "${body}"`);
    }
}

abstract class MailerFactory {
    abstract createMailer(): Mailer;

    sendEmail(to: string, subject: string, body: string): void {
        const mailer = this.createMailer();
        mailer.send(to, subject, body);
    }
}

class SendGridMailerFactory extends MailerFactory {
    createMailer(): Mailer {
        return new SendGridMailer();
    }
}

class ResendMailerFactory extends MailerFactory {
    createMailer(): Mailer {
        return new ResendMailer();
    }
}

