import * as icons from '@/assets'
import { ImageSourcePropType } from 'react-native';

interface ModelInfo{
    name: string,
    icon: ImageSourcePropType,
    api: string,
    Prompt?: string
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


export{
    TopBarItem
}