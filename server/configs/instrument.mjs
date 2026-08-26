import * as Sentry from "@sentry/node";

const sentryDsn = process.env.SENTRY_DSN;
if (sentryDsn && !sentryDsn.includes("________")) {
    Sentry.init({
        dsn: sentryDsn,
        sendDefaultPii: true,
    });
}
