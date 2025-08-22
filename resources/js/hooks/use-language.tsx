
import { usePage } from '@inertiajs/react';
export function initializeAppLocale() {
    const { locale, pageDir } = usePage().props as unknown as { locale: string, pageDir: string };
    console.log({ locale: locale, pageDir: pageDir })
    document.querySelector("html")?.setAttribute("lang", locale);
    document.querySelector("html")?.setAttribute("dir", pageDir);
    var $body = document.querySelector("body");
    const cl = ['ltr', 'rtl'];
    if ($body) {
        for (let index = 0; index < cl.length; index++) {
            const el = cl[index];
            if ($body.classList.contains(`dir-${el}`))
                $body.classList.remove(`dir-${el}`);
            if ($body.classList.contains(el))
                $body.classList.remove(el);
        }
        $body.setAttribute("dir", pageDir);
        $body.classList.add(`dir-${pageDir}`);
        $body.classList.add(pageDir);
    }
    //font-sans antialiased dir-rtl dir-rtl:text-right dir-ltr:text-left rtl
    //<body class="font-sans antialiased dir-rtl dir-rtl:text-right dir-ltr:text-left rtl" dir="rtl" style="">
}
export function getAppLocale() {
    const { locale } = usePage().props as unknown as { locale: string };

    return locale;
}
export function getPageDirection() {
    const { pageDir } = usePage().props as unknown as { pageDir: string };

    return pageDir;
}
