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

const setTypeCamera = (_type) => {

    switch (_type) {
        case 1:
            acessoWebFrame.initCameraNormal('#fff');
            break;
        case 2:
            console.log('showLoadingModels')
            acessoWebFrame.acessoWebFrameModel.loadModelsCameraInteligence()
                .then(() => {
                    acessoWebFrame.initCameraInteligence('#2980ff', '#ed2121', '#fff');
                })
                .catch((e) => {
                    console.log('showError')
                    console.log(e);
                    acessoWebFrame.initCameraNormal('#fff');
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
        console.log('onSuccessCapture')
        console.log(obj);
    }

    onFailedCapture = (err) => {
        console.log('onFailedCapture')
        if (err === "navigator.MediaDevices.getUserMedia error: Permission denied, NotAllowedError") {
            console.log('Você negou o acesso a câmera. Procure pelo icone de câmera na barra de navegação e mude sua decisão.')
        }

        console.log(err);
    }

    onBrowserNotSupport = (obj) => {
        console.log('onBrowserNotSupport')
        console.log(obj);
    };

    acessoWebFrame.onSuccessCaptureJS = onSuccessCapture;
    acessoWebFrame.onFailedCaptureJS = onFailedCapture;
    acessoWebFrame.onBrowserNotSupportJS = onBrowserNotSupport;

    setTypeCamera(_type);
});