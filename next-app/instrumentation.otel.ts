import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { UndiciInstrumentation } from '@opentelemetry/instrumentation-undici';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

const otelEndpoint = process.env.OTEL_ENDPOINT;
const environment = process.env.ENVIRONMENT;

if (otelEndpoint) {
    const sdk = new NodeSDK({
        resource: resourceFromAttributes({
            [ATTR_SERVICE_NAME]: 'timewaste-tracker',
            ['deployment.environment.name']: environment,
        }),
        spanProcessor: new SimpleSpanProcessor(
            new OTLPTraceExporter({
                url: otelEndpoint,
            }),
        ),
        instrumentations: [new UndiciInstrumentation()],
    });
    sdk.start();
}
