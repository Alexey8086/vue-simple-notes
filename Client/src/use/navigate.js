import { useRouter } from 'vue-router'

function navigate () {
    const router = useRouter()

    const pushUrl = (url) => {
        router.push(url)
    }

    return {
        pushUrl
    }
}

export default navigate
