import * as icons from '@/assets'
import { ImageSourcePropType } from 'react-native';

interface ModelInfo{
    name: string,
    icon: ImageSourcePropType,
    api: string,
}

interface AvatarModelInfo{
    name: string,
    image: string,
    api: string,
    prompt: string, 
}

const TopBarItem: ModelInfo[] = [
    {
        name: 'Text to Image',
        icon: icons.text_to_image,
        api: 'imagetotext'
    }
    ,{
        name: 'Remove Bg',
        icon: icons.removebg,
        api: 'removebg'
    },
    {
        name: 'Image Upscaling',
        icon: icons.imgup,
        api: 'imgup'
    },
    {
        name: 'MockUp/Fine Tune',
        icon: icons.MockUp,
        api: 'mockup'
    }
]


const AvatarModel: AvatarModelInfo[] = [
    {
        name: 'Cyberpunk Avatar',
        image: 'https://res.cloudinary.com/djqalecmu/image/upload/v1731090623/tmsaeycwsro6ikwj1bkt.png',
        api: 'avatar',
        prompt: 'A futuristic human with neon-lit cyber enhancements, metallic arms, and a visor displaying data in bright colors. They wear a sleek, dark jacket with glowing circuitry patterns and stand against a bustling, rain-soaked cityscape, illuminated by neon signs in blues and pink'
    },
    {
        name: 'Superhero Avatar',
        image: 'https://res.cloudinary.com/djqalecmu/image/upload/v1731091000/rjscmvklgqpskupbskd5.png',
        api: 'avatar',
        prompt: 'A heroic figure with a flowing cape, mask, and custom suit featuring a unique emblem. The character stands confidently with a powerful stance, wearing bright, bold colors, and the city skyline looms in the background, with clouds parting to let a beam of sunlight shine on them'
    },
    {
        name: 'Fantasy Warrior',
        image: 'https://res.cloudinary.com/djqalecmu/image/upload/v1731091345/e2x6nfxqthf9ypncfwfi.png',
        api: 'avatar',
        prompt: 'A battle-ready warrior in gleaming armor with intricate patterns and a magical sword, standing in a misty forest. Their expression is determined, and they have various scars from past battles. Magical runes glow faintly on the armor, with a mystical aura surrounding them'
    },
    {
        name: 'Anime Avatar',
        image: 'https://res.cloudinary.com/djqalecmu/image/upload/v1731091444/kirp0fv6c9hqc0lkzduq.png',
        api: 'avatar',
        prompt: 'A youthful character with large, expressive eyes, vibrant pastel-colored hair, and a cheerful smile. They are wearing trendy clothing with exaggerated details, like a jacket with patches and pins, and stand in front of a bright, anime-style background with cherry blossom trees'
    },
    {
        name: 'Vampire Avatar',
        image: 'https://res.cloudinary.com/djqalecmu/image/upload/v1731091525/tcx4srstdwzkwdsudpgz.png',
        api: 'avatar',
        prompt: 'A pale vampire with piercing red eyes, wearing a luxurious dark cloak and fangs visible. They stand in a dimly lit gothic mansion with chandeliers and red velvet curtains, exuding elegance and mystery'
    }
]

const StylingModel: AvatarModelInfo[] = [
    {
        name: 'Steampunk',
        image: 'https://res.cloudinary.com/djqalecmu/image/upload/v1731094801/vm5uz7kmbo604rvfbmsa.png',
        api: 'avatar',
        prompt: 'Style this image with a steampunk aesthetic, adding Victorian-era fashion, brass gears, and steam-powered machinery. Use warm, metallic colors like bronze, copper, and sepia tones. Emphasize a mix of industrial and vintage elements with a rustic, mechanical vibe and intricate, hand-crafted details',
    },
    {
        name: 'Retro Vintage',
        image: 'https://res.cloudinary.com/djqalecmu/image/upload/v1731094536/qksgfoktuavjiicxrs4x.png',
        api: 'avatar',
        prompt: 'Convert this image to a retro vintage style, with warm tones, muted colors, and a slight film grain effect. Add a nostalgic, aged look, reminiscent of a 1970s photograph. Use soft lighting with a subtle sepia tint, creating a cozy, timeless feel with faded textures and classic vintage appeal'
    }
]


export{
    TopBarItem,
    AvatarModel,
    AvatarModelInfo,
    StylingModel
}