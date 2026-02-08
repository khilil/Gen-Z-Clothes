export function waitForFont(fontFamily) {
    return new Promise((resolve) => {
        if (document.fonts.check(`16px "${fontFamily}"`)) {
            resolve();
        } else {
            document.fonts.load(`16px "${fontFamily}"`).then(resolve);
        }
    });
}
