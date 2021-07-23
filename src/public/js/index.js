const onDomLoaded = (e) => {
    const avatarsRef = document.querySelectorAll('.avatarImg');
    const previewEleRef = document.querySelector('.previewEle');

    const onAvatarPreviewClick = (event) => {
        const fileName = event.currentTarget.getAttribute('data-filename');
        try {
            previewEleRef.setAttribute('src', `/files/${fileName}`);
        } catch (err) {
            console.error('Cannot serve avatar image ', err.message);
        }
    };

    // Bind click events for each avatar
    for (let i = 0; i < avatarsRef.length; i++) {
        avatarsRef[i].addEventListener('click', onAvatarPreviewClick);
    }
};

window.addEventListener('DOMContentLoaded', onDomLoaded);
