import { buildApp } from "../server/app";

let appPromise: Promise<any> | null = null;

export default async function handler(req: any, res: any) {
    if (!appPromise) {
        appPromise = buildApp().then((res) => res.app);
    }

    const app = await appPromise;
    app(req, res);
}
