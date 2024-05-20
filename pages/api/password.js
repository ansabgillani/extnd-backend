import EncryptHelper from "@/libs/encrypt"

export default async function handler(req, res) {
    const password = await EncryptHelper.encrypt("testing123");
    return res.status(200).json({ password })
}