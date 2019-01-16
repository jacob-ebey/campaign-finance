export default async function client(url, ops) {
    if (!ops || ops.nocache !== true) {
        const cached = localStorage.getItem(url);
        const obj = cached && JSON.parse(cached);

        if (obj && ((new Date().toDateString()) === obj.timestamp)) {
            return obj.value;
        }
    }

    const res = await fetch(url, {
        ...ops,
        headers: {
            ...(ops && ops.headers),
            "X-API-Key": "h0s3imRaiz13bsZTlSagL1pxp7gW43mY9s6z5W96"
        }
    });

    if (res.ok) {
        const value = await res.json();

        if (value && (!value.error && !value.errors)) {
            localStorage.setItem(url, JSON.stringify({
                value,
                timestamp: new Date().toDateString()
            }));
        }

        return value;
    } else {
        throw new Error("Unable to load the requested data.");
    }
}
