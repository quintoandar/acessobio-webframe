var acessoWebFrame;

const getUrlVars = () => {
    let vars = [],
        hash;
    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};

const showCompletedAnimation = () => {
    document.getElementById('box--completed').style.display = 'inline-block';
};

const hideCompletedAnimation = () => {
    document.getElementById('box--completed').style.display = 'none';
};

const showLoadingModels = () => {
    document.getElementById('box--loading-models').style.display = 'inline-block';
};

const hideLoadingModels = () => {
    document.getElementById('box--loading-models').style.display = 'none';
};

const showError = (message = "Ops... Algo inesperado aconteceu!") => {
    document.getElementById('error-message').innerHTML = message;
    document.getElementById('box--error').style.display = 'inline-block';
};

const hideError = () => {
    document.getElementById('box--error').style.display = 'none';
};

const setTypeCamera = (_type) => {

    switch (_type) {
        case 1:
            acessoWebFrame.initCameraNormal('#fff');
            break;
        case 2:
            showLoadingModels();
            acessoWebFrame.acessoWebFrameModel.loadModelsCameraInteligence()
                .then(() => {
                    hideLoadingModels();
                    acessoWebFrame.initCameraInteligence('#2980ff', '#ed2121', '#fff');
                })
                .catch((e) => {
                    showError(e);
                    console.log(e);
                });
            break;
        case 3:
            acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.CNH, '#fff');
            break;
        case 4:
            acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.RG, '#fff');
            break;
        case 5:
            acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.CPF, '#fff');
            break;
        case 6:
            acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.NEW_RG, '#fff');
            break;
        case 7:
            acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.OTHERS, '#fff', 'Título de eleitor');
            break;
        case 8:
            acessoWebFrame.initCameraNormal('#fff', acessoWebFrame.FACE_MODE_TYPE.BACK);
            break;
        case 9:
            acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.RG_FRONT, '#fff');
            break;
        case 10:
            acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.RG_BACK, '#fff');
            break;
        case 11:
            acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.NEW_RG_FRONT, '#fff');
            break;
        case 12:
            acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.NEW_RG_BACK, '#fff');
            break;
        default:
            acessoWebFrame.initCameraNormal('#fff');
    }
};

document.addEventListener("DOMContentLoaded", () => {

    let _type = parseInt((getUrlVars()["type"]));

    acessoWebFrame = new AcessoWebFrame();

    onSuccessCapture = (obj) => {
        // showCompletedAnimation();
        console.log('onSuccessCapture')
        console.log(obj);
    }

    onFailedCapture = (err) => {
        console.log('onFailedCapture')
        if (err === "navigator.MediaDevices.getUserMedia error: Permission denied, NotAllowedError") {
            // showError('Você negou o acesso a câmera. Procure pelo icone de câmera na barra de navegação e mude sua decisão.')
            console.log('Você negou o acesso a câmera. Procure pelo icone de câmera na barra de navegação e mude sua decisão.')
        }

        console.log(err);
    }

    onBrowserNotSupport = (obj) => {
        console.log('onBrowserNotSupport')
        console.log(obj);
        // let boxSupport = document.getElementById('box--support');

        // for (let i = 0; i < obj.listBrowsersSupport.length; i++) {
        //     if (obj.listBrowsersSupport[i] === 'Chrome') {
        //         boxSupport.querySelector('#li-chrome').classList.add('no-grayscale');
        //         continue;
        //     }

        //     if (obj.listBrowsersSupport[i] === 'Firefox') {
        //         boxSupport.querySelector('#li-firefox').classList.add('no-grayscale');
        //         continue;
        //     }

        //     if (obj.listBrowsersSupport[i] === 'Edge') {
        //         boxSupport.querySelector('#li-edge').classList.add('no-grayscale');
        //         continue;
        //     }

        //     if (obj.listBrowsersSupport[i] === 'Opera') {
        //         boxSupport.querySelector('#li-opera').classList.add('no-grayscale');
        //         continue;
        //     }

        //     if (obj.listBrowsersSupport[i] === 'Safari') {
        //         boxSupport.querySelector('#li-safari').classList.add('no-grayscale');
        //         continue;
        //     }
        // };

        // boxSupport.style.display = 'block';
    };

    acessoWebFrame.onSuccessCaptureJS = onSuccessCapture;
    acessoWebFrame.onFailedCaptureJS = onFailedCapture;
    acessoWebFrame.onBrowserNotSupportJS = onBrowserNotSupport;

    setTypeCamera(_type);
});