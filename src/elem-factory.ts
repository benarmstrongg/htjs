import { elementFactoryFactory as e } from './lib';

type IntrinsicElementFactory = {
    a: ReturnType<typeof e<'a', any>>;
    abbr: ReturnType<typeof e<'abbr', any>>;
    address: ReturnType<typeof e<'address', any>>;
    area: ReturnType<typeof e<'area', any>>;
    article: ReturnType<typeof e<'article', any>>;
    aside: ReturnType<typeof e<'aside', any>>;
    audio: ReturnType<typeof e<'audio', any>>;
    b: ReturnType<typeof e<'b', any>>;
    base: ReturnType<typeof e<'base', any>>;
    bdi: ReturnType<typeof e<'bdi', any>>;
    bdo: ReturnType<typeof e<'bdo', any>>;
    big: ReturnType<typeof e<'big', any>>;
    blockquote: ReturnType<typeof e<'blockquote', any>>;
    body: ReturnType<typeof e<'body', any>>;
    br: ReturnType<typeof e<'br', any>>;
    button: ReturnType<typeof e<'button', any>>;
    canvas: ReturnType<typeof e<'canvas', any>>;
    caption: ReturnType<typeof e<'caption', any>>;
    cite: ReturnType<typeof e<'cite', any>>;
    code: ReturnType<typeof e<'code', any>>;
    col: ReturnType<typeof e<'col', any>>;
    colgroup: ReturnType<typeof e<'colgroup', any>>;
    data: ReturnType<typeof e<'data', any>>;
    datalist: ReturnType<typeof e<'datalist', any>>;
    dd: ReturnType<typeof e<'dd', any>>;
    del: ReturnType<typeof e<'del', any>>;
    details: ReturnType<typeof e<'details', any>>;
    dfn: ReturnType<typeof e<'dfn', any>>;
    dialog: ReturnType<typeof e<'dialog', any>>;
    div: ReturnType<typeof e<'div', any>>;
    dl: ReturnType<typeof e<'dl', any>>;
    dt: ReturnType<typeof e<'dt', any>>;
    em: ReturnType<typeof e<'em', any>>;
    embed: ReturnType<typeof e<'embed', any>>;
    fieldset: ReturnType<typeof e<'fieldset', any>>;
    figcaption: ReturnType<typeof e<'figcaption', any>>;
    figure: ReturnType<typeof e<'figure', any>>;
    footer: ReturnType<typeof e<'footer', any>>;
    form: ReturnType<typeof e<'form', any>>;
    h1: ReturnType<typeof e<'h1', any>>;
    h2: ReturnType<typeof e<'h2', any>>;
    h3: ReturnType<typeof e<'h3', any>>;
    h4: ReturnType<typeof e<'h4', any>>;
    h5: ReturnType<typeof e<'h5', any>>;
    h6: ReturnType<typeof e<'h6', any>>;
    head: ReturnType<typeof e<'head', any>>;
    header: ReturnType<typeof e<'header', any>>;
    hgroup: ReturnType<typeof e<'hgroup', any>>;
    hr: ReturnType<typeof e<'hr', any>>;
    html: ReturnType<typeof e<'html', any>>;
    i: ReturnType<typeof e<'i', any>>;
    iframe: ReturnType<typeof e<'iframe', any>>;
    img: ReturnType<typeof e<'img', any>>;
    input: ReturnType<typeof e<'input', any>>;
    ins: ReturnType<typeof e<'ins', any>>;
    kbd: ReturnType<typeof e<'kbd', any>>;
    keygen: ReturnType<typeof e<'keygen', any>>;
    label: ReturnType<typeof e<'label', any>>;
    legend: ReturnType<typeof e<'legend', any>>;
    li: ReturnType<typeof e<'li', any>>;
    link: ReturnType<typeof e<'link', any>>;
    main: ReturnType<typeof e<'main', any>>;
    map: ReturnType<typeof e<'map', any>>;
    mark: ReturnType<typeof e<'mark', any>>;
    menu: ReturnType<typeof e<'menu', any>>;
    menuitem: ReturnType<typeof e<'menuitem', any>>;
    meta: ReturnType<typeof e<'meta', any>>;
    meter: ReturnType<typeof e<'meter', any>>;
    nav: ReturnType<typeof e<'nav', any>>;
    noscript: ReturnType<typeof e<'noscript', any>>;
    object: ReturnType<typeof e<'object', any>>;
    ol: ReturnType<typeof e<'ol', any>>;
    optgroup: ReturnType<typeof e<'optgroup', any>>;
    option: ReturnType<typeof e<'option', any>>;
    output: ReturnType<typeof e<'output', any>>;
    p: ReturnType<typeof e<'p', any>>;
    param: ReturnType<typeof e<'param', any>>;
    picture: ReturnType<typeof e<'picture', any>>;
    pre: ReturnType<typeof e<'pre', any>>;
    progress: ReturnType<typeof e<'progress', any>>;
    q: ReturnType<typeof e<'q', any>>;
    rp: ReturnType<typeof e<'rp', any>>;
    rt: ReturnType<typeof e<'rt', any>>;
    ruby: ReturnType<typeof e<'ruby', any>>;
    s: ReturnType<typeof e<'s', any>>;
    samp: ReturnType<typeof e<'samp', any>>;
    search: ReturnType<typeof e<'search', any>>;
    slot: ReturnType<typeof e<'slot', any>>;
    script: ReturnType<typeof e<'script', any>>;
    section: ReturnType<typeof e<'section', any>>;
    select: ReturnType<typeof e<'select', any>>;
    small: ReturnType<typeof e<'small', any>>;
    source: ReturnType<typeof e<'source', any>>;
    span: ReturnType<typeof e<'span', any>>;
    strong: ReturnType<typeof e<'strong', any>>;
    style: ReturnType<typeof e<'style', any>>;
    sub: ReturnType<typeof e<'sub', any>>;
    summary: ReturnType<typeof e<'summary', any>>;
    sup: ReturnType<typeof e<'sup', any>>;
    table: ReturnType<typeof e<'table', any>>;
    tbody: ReturnType<typeof e<'tbody', any>>;
    td: ReturnType<typeof e<'td', any>>;
    textarea: ReturnType<typeof e<'textarea', any>>;
    tfoot: ReturnType<typeof e<'tfoot', any>>;
    th: ReturnType<typeof e<'th', any>>;
    thead: ReturnType<typeof e<'thead', any>>;
    time: ReturnType<typeof e<'time', any>>;
    title: ReturnType<typeof e<'title', any>>;
    tr: ReturnType<typeof e<'tr', any>>;
    track: ReturnType<typeof e<'track', any>>;
    u: ReturnType<typeof e<'u', any>>;
    ul: ReturnType<typeof e<'ul', any>>;
    var: ReturnType<typeof e<'var', any>>;
    video: ReturnType<typeof e<'video', any>>;
    wbr: ReturnType<typeof e<'wbr', any>>;
    // SVG
    svg: ReturnType<typeof e<'svg', any>>;
    animate: ReturnType<typeof e<'animate', any>>;
    animateMotion: ReturnType<typeof e<'animateMotion', any>>;
    animateTransform: ReturnType<typeof e<'animateTransform', any>>;
    circle: ReturnType<typeof e<'circle', any>>;
    clipPath: ReturnType<typeof e<'clipPath', any>>;
    defs: ReturnType<typeof e<'defs', any>>;
    desc: ReturnType<typeof e<'desc', any>>;
    ellipse: ReturnType<typeof e<'ellipse', any>>;
    feBlend: ReturnType<typeof e<'feBlend', any>>;
    feColorMatrix: ReturnType<typeof e<'feColorMatrix', any>>;
    feComponentTransfer: ReturnType<typeof e<'feComponentTransfer', any>>;
    feComposite: ReturnType<typeof e<'feComposite', any>>;
    feConvolveMatrix: ReturnType<typeof e<'feConvolveMatrix', any>>;
    feDiffuseLighting: ReturnType<typeof e<'feDiffuseLighting', any>>;
    feDisplacementMap: ReturnType<typeof e<'feDisplacementMap', any>>;
    feDistantLight: ReturnType<typeof e<'feDistantLight', any>>;
    feDropShadow: ReturnType<typeof e<'feDropShadow', any>>;
    feFlood: ReturnType<typeof e<'feFlood', any>>;
    feFuncA: ReturnType<typeof e<'feFuncA', any>>;
    feFuncB: ReturnType<typeof e<'feFuncB', any>>;
    feFuncG: ReturnType<typeof e<'feFuncG', any>>;
    feFuncR: ReturnType<typeof e<'feFuncR', any>>;
    feGaussianBlur: ReturnType<typeof e<'feGaussianBlur', any>>;
    feImage: ReturnType<typeof e<'feImage', any>>;
    feMerge: ReturnType<typeof e<'feMerge', any>>;
    feMergeNode: ReturnType<typeof e<'feMergeNode', any>>;
    feMorphology: ReturnType<typeof e<'feMorphology', any>>;
    feOffset: ReturnType<typeof e<'feOffset', any>>;
    fePointLight: ReturnType<typeof e<'fePointLight', any>>;
    feSpecularLighting: ReturnType<typeof e<'feSpecularLighting', any>>;
    feSpotLight: ReturnType<typeof e<'feSpotLight', any>>;
    feTile: ReturnType<typeof e<'feTile', any>>;
    feTurbulence: ReturnType<typeof e<'feTurbulence', any>>;
    filter: ReturnType<typeof e<'filter', any>>;
    foreignObject: ReturnType<typeof e<'foreignObject', any>>;
    g: ReturnType<typeof e<'g', any>>;
    image: ReturnType<typeof e<'image', any>>;
    line: ReturnType<typeof e<'line', any>>;
    linearGradient: ReturnType<typeof e<'linearGradient', any>>;
    marker: ReturnType<typeof e<'marker', any>>;
    mask: ReturnType<typeof e<'mask', any>>;
    metadata: ReturnType<typeof e<'metadata', any>>;
    mpath: ReturnType<typeof e<'mpath', any>>;
    path: ReturnType<typeof e<'path', any>>;
    pattern: ReturnType<typeof e<'pattern', any>>;
    polygon: ReturnType<typeof e<'polygon', any>>;
    polyline: ReturnType<typeof e<'polyline', any>>;
    radialGradient: ReturnType<typeof e<'radialGradient', any>>;
    rect: ReturnType<typeof e<'rect', any>>;
    set: ReturnType<typeof e<'set', any>>;
    stop: ReturnType<typeof e<'stop', any>>;
    switch: ReturnType<typeof e<'switch', any>>;
    symbol: ReturnType<typeof e<'symbol', any>>;
    text: ReturnType<typeof e<'text', any>>;
    textPath: ReturnType<typeof e<'textPath', any>>;
    tspan: ReturnType<typeof e<'tspan', any>>;
    use: ReturnType<typeof e<'use', any>>;
    view: ReturnType<typeof e<'view', any>>;
};

const intrinsicElementFactoryProxy = new Proxy(
    {},
    {
        // @ts-expect-error
        get: (_, prop) => e(prop),
    }
);

export const _ = intrinsicElementFactoryProxy as IntrinsicElementFactory;
