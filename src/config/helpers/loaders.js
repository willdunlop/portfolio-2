
const loaders = {

    firebase: module => {
        return new Promise(resolve => {
            const script = document.createElement('script');
            script.src = `https://www.gstatic.com/firebasejs/5.5.6/firebase-${module}.js`;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => { throw new Error() };
            document.head.appendChild(script)
        })
    },

    threeJs: () => {
        console.log("THREE === undefined", THREE === undefined);
        return new Promise(resolve => {
            if (THREE === undefined) {
                const threeScript = document.createElement('script');
                const controlsScript = document.createElement('script');
                threeScript.src = "assets/vendor/three.min.js";
                threeScript.onload = () => resolve();
                threeScript.onerror = () => { throw new Error() };
                document.head.appendChild(threeScript)
            } else {
                resolve();
            }
        })
    },
};

export default loaders;