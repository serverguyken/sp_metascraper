import Routhr, { RequestInterface, ResponseInterface } from "routhr";
import axios from 'axios';
import * as cheerio from 'cheerio';


interface Meta {
    title: string;
    description: string;
    image: string | null;
    card: string;
    url: string;
    short_url: string;
    site_name: string;
    creator: string;
    initial_url: string;
}


const parseUrl = (url: string) => {
    const xpaths = {
        title: {
            selector: 'meta[name="spacre:title"]',
            alternateSelector: {
                og: 'meta[property="og:title"]',
                twitter: 'meta[name="twitter:title"]',
                title: 'title',
            },
            attr: 'content',
        },
        description: {
            selector: 'meta[name="spacre:description"]',
            alternateSelector: {
                og: 'meta[property="og:description"]',
                twitter: 'meta[name="twitter:description"]',
                metaDescription: 'meta[name="description"]',
                description: 'description',
            },
            attr: 'content',
        },
        image: {
            selector: 'meta[name="spacre:image"]',
            alternateSelector: {
                og: 'meta[property="og:image"]',
                twitter: 'meta[name="twitter:image"]',
                image: 'meta[name="image"]',
            },
            attr: 'content',
        },
        card: {
            selector: 'meta[name="spacre:card"]',
            alternateSelector: {
                og: 'meta[property="og:card"]',
            },
            attr: 'content',
        },
        url: {
            selector: 'meta[name="spacre:url"]',
            alternateSelector: {
                og: 'meta[property="og:url"]',
                twitter: 'meta[name="twitter:url"]',
                url: 'meta[name="url"]',
            },
            attr: 'content',
        },
        short_url: {
            selector: 'meta[name="spacre:short_url"]',
            alternateSelector: {
                og: 'meta[property="og:short_url"]',
            },
            attr: 'content',
        },
        site_name: {
            selector: 'meta[name="spacre:site_name"]',
            alternateSelector: {
                og: 'meta[property="og:site_name"]',
            },
            attr: 'content',
        },
        creator: {
            selector: 'meta[name="spacre:creator"]',
            alternateSelector: {
                og: 'meta[property="og:creator"]',
            },
            attr: 'content',
        },
    }

    const getPage = (url: string) => axios.request({ url });
    const mapProperties = (document: any) => {
        const html = cheerio.load(document);
        console.log(html('title').text());
        const tags = {
            title: html(xpaths.title.selector).attr(xpaths.title.attr) || html(xpaths.title.alternateSelector.og).attr(xpaths.title.attr) || html(xpaths.title.alternateSelector.twitter).attr(xpaths.title.attr) || html(xpaths.title.alternateSelector.title).text() || null,
            description: html(xpaths.description.selector).attr(xpaths.description.attr) || html(xpaths.description.alternateSelector.og).attr(xpaths.description.attr) || html(xpaths.description.alternateSelector.twitter).attr(xpaths.description.attr) || html(xpaths.description.alternateSelector.metaDescription).attr(xpaths.description.attr) || html(xpaths.description.alternateSelector.description).text() || null,
            image: html(xpaths.image.selector).attr(xpaths.image.attr) || html(xpaths.image.alternateSelector.og).attr(xpaths.image.attr) || html(xpaths.image.alternateSelector.twitter).attr(xpaths.image.attr) || html(xpaths.image.alternateSelector.image).attr(xpaths.image.attr) || null,
            card: html(xpaths.card.selector).attr(xpaths.card.attr) || html(xpaths.card.alternateSelector.og).attr(xpaths.card.attr) || null,
            url: html(xpaths.url.selector).attr(xpaths.url.attr) || html(xpaths.url.alternateSelector.og).attr(xpaths.url.attr) || html(xpaths.url.alternateSelector.twitter).attr(xpaths.url.attr) || html(xpaths.url.alternateSelector.url).attr(xpaths.url.attr) || null,
            short_url: html(xpaths.short_url.selector).attr(xpaths.short_url.attr) || html(xpaths.short_url.alternateSelector.og).attr(xpaths.short_url.attr) || null,
            site_name: html(xpaths.site_name.selector).attr(xpaths.site_name.attr) || html(xpaths.site_name.alternateSelector.og).attr(xpaths.site_name.attr) || null,
            creator: html(xpaths.creator.selector).attr(xpaths.creator.attr) || html(xpaths.creator.alternateSelector.og).attr(xpaths.creator.attr) || null,
        }
        return tags;
    }

    const ParseUrl = (url: string) =>
        getPage(url).then((res: any) => {
            const document = res.data;
            const mappedProperties = {
                ...mapProperties(document),
                initial_url: url,
            }
            return mappedProperties;
        });
    

    return ParseUrl(url);
}
const metaHandler = (req: RequestInterface, res: ResponseInterface) => {
    const url = req.routhr?.route?.queries.url;
    parseUrl(url).then((result: any) => {
        const meta: Meta = {
            title: result.title,
            description: result.description,
            image: result.image,
            card: result.card,
            url: result.url,
            short_url: result.short_url,
            site_name: result.site_name,
            creator: result.creator,
            initial_url: result.initial_url,
        }
        console.log(meta);
        res.status(200).json({
            meta,
            status: {
                success: true,
                code: 200,
                message: 'OK',
            }
        });
    }).catch((err: any) => {
        res.status(400).json({
            status: {
                success: false,
                code: 400,
                message: 'Bad Request',
            }
        });
    });
};

export default metaHandler;