export function getUrlVars() {
    const vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (_, key, value) {
        if (key.includes("[")) {
            key = key.split("[", 1)[0];
            if (!Array.isArray(vars[key])) {
                vars[key] = [];
            }
            vars[key].push(value);
        } else {
            vars[key] = value;
        }
    });
    return vars;
}

export function getCycle(cycle) {
    if (cycle) return cycle;

    const year = new Date().getFullYear();

    return year % 2 === 0 ? year : year - 1;
}

export function asyncLoad(self, tasks) {
    const labels = [];
    const promises = tasks.map(t => {
        labels.push(t[0]);
        const p = t[1]().then(() => {
            p.done = true;
        });

        return p;
    });

    return new Promise((resolve) => {
        const check = () => {
            let found = false;
            for (let i = 0; i < promises.length; i++) {
                const index = i;
                if (!promises[0].done) {
                    self.set({ loadingMessage: labels[index] });
                    found = true;
                    break;
                }
            }
            if (!found) {
                self.set({ loadingMessage: null });
                resolve();
            } else {
                setTimeout(check, 10);
            }
        };
        check();
    });
}

export function formatYYYYMMDD(dateStr) {
    if (!dateStr) return "---";

    const parts = dateStr.split("-");
    return new Date(parts[2], parts[1] - 1, parts[0]).toLocaleDateString();
}
