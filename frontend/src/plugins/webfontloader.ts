import webfontloader from 'webfontloader'

export async function loadFonts() {

    webfontloader.load({
        google: {
            families: [
                "Poppins:900,800,700,600,500,400,300,200,100&display=swap"
            ]
        }
    })

}