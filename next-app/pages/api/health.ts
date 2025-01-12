import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { checkApiKey } from '../../helper/steamApiHelper';

/**
 * The health endpoint.
 * @param {NextApiRequest} _req The request.
 * @param {NextApiResponse} res The response.
 */
const handler: NextApiHandler = async (_req: NextApiRequest, res: NextApiResponse) => {
    const isApiKeyValid = await checkApiKey();
    if (!isApiKeyValid) {
        res.status(500).json({ message: 'unhealthy: Steam API key is not valid' });
        return;
    }
    res.status(200).json({ message: 'healthy' });
};

export default handler;
