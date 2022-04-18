import Routhr, { RequestInterface, ResponseInterface } from "routhr";

interface Meta {
    title: string;
    description: string;
    image: string | null;
    url: string;
    type: string;
    initial_url: string;
    locale: string;
    creator: string;
}

const metaHandler = (req: RequestInterface, res: ResponseInterface) => {
    const url = req.query.url as string;
    const meta: Meta = {
        title: 'Landing Page | Web',
        description: 'A simple landing page for web',
        image: null,
        url: 'https://web.com',
        type: 'website',
        initial_url: url,
        locale: 'en_US',
        creator: 'Web',
    };
    res.status(200).json(meta);
};

export default metaHandler;