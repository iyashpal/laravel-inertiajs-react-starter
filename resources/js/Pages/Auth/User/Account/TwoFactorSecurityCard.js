import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Button, ConfirmPassword, Input, Label } from "@/Components";
import { useForm, usePage } from "@inertiajs/inertia-react";

export default function TwoFactorSecurityCard() {

    const [qrCode, setQrCode] = React.useState(null)
    const [setupKey, setSetupKey] = React.useState(null)
    const [enabling, setEnabling] = React.useState(false)
    const [disabling, setDisabling] = React.useState(false)
    const [confirming, setConfirming] = React.useState(false)
    const [recoveryCodes, setRecoveryCodes] = React.useState([])
    const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false)
    const { props: { user, confirmsTwoFactorAuthentication } } = usePage()
    const { setData, post, data, errors } = useForm({ code: '' })

    React.useEffect(() => {
        setTwoFactorEnabled(!enabling && user.two_factor_enabled)

        console.log('in use effect')
    }, [])

    const statusTitle = () => {
        if (twoFactorEnabled && !confirming) {
            return `You have enabled two factor authentication.`
        } else if (twoFactorEnabled && confirming) {
            return `Finish enabling two factor authentication.`
        } else {
            return `You have not enabled two factor authentication.`
        }
    }

    function enableTwoFactorAuthentication() {

        setEnabling(true)

        Inertia.post(route('two-factor.enable'), {}, {
            preserveScroll: true,
            onSuccess: () => Promise.all([
                showQrCode(),
                showSetupKey(),
                showRecoveryCodes(),
            ]),
            onFinish: () => {
                setEnabling(false)
                setConfirming(confirmsTwoFactorAuthentication)
            },
        });
    };

    function showQrCode() {
        return axios.get(route('two-factor.qr-code'))
            .then(({ data }) => setQrCode(data.svg));
    }

    function showSetupKey() {
        return axios.get(route('two-factor.secret-key'))
            .then(({ data }) => setSetupKey(data.secretKey))
    }


    function showRecoveryCodes() {
        return axios.get(route('two-factor.recovery-codes'))
            .then(({ data }) => setRecoveryCodes(data))
    }

    function confirmTwoFactorAuthentication() {
        post(route('two-factor.confirm'), {
            preserveScroll: true,
            preserveState: true,
            errorBag: "confirmTwoFactorAuthentication",
            onSuccess: () => {
                setConfirming(false)
                setQrCode(null)
                setSetupKey(null)
            },
        });
    }


    function regenerateRecoveryCodes() {
        axios.post(route('two-factor.recovery-codes')).then(() => showRecoveryCodes());
    };

    function disableTwoFactorAuthentication() {
        setDisabling(true)

        Inertia.delete(route('two-factor.disable'), {
            preserveScroll: true,
            onSuccess: () => {
                setDisabling(false)
                setConfirming(false)
            },
        });
    }

    return <>
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="md:grid md:grid-cols-3 md:gap-6 px-4 py-5 sm:p-6">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Two Factor Authentication</h3>
                    <p className="mt-1 text-sm text-gray-500">Add additional security to your account using two factor authentication.</p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <h3 className="text-lg font-medium text-gray-900">
                        {statusTitle()}
                    </h3>

                    <div className="mt-3 max-w-xl text-sm text-gray-600">
                        <p>When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application.</p>
                    </div>


                    {user.two_factor_enabled && <>

                        {qrCode && <>

                            <div className="mt-4 max-w-xl text-sm text-gray-600">

                                {confirming && <p className="font-semibold">
                                    To finish enabling two factor authentication, scan the following QR code using your phone's authenticator application or enter the setup key and provide the generated OTP code.
                                </p>}

                                {!confirming && <p >
                                    Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator application or enter the setup key.
                                </p>}

                            </div>


                            <div className="mt-4" dangerouslySetInnerHTML={{ __html: qrCode }}></div>

                            {setupKey && <div className="mt-4 max-w-xl text-sm text-gray-600">
                                <p className="font-semibold">
                                    Setup Key: <span>{setupKey}</span>
                                </p>
                            </div>}

                            {confirming && <div className="mt-4">
                                <Label value={'Code'} />
                                <Input className={'block mt-1 w-1/2'} value={data.code} onChange={(e) => setData('code', e.target.value)} />
                                {errors.code && <p className="text-sm font-medium text-red-500">{errors.code}</p>}
                            </div>}

                        </>}

                        {(recoveryCodes.length > 0 && !confirming) && <>

                            <div class="mt-4 max-w-xl text-sm text-gray-600">
                                <p class="font-semibold">
                                    Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost.
                                </p>
                            </div>

                            <div class="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 rounded-lg">
                                {recoveryCodes.map((code, key) => (<div key={key}>{code}</div>))}
                            </div>

                        </>}

                    </>}

                    <div className="mt-5 space-x-3">

                        {!user.two_factor_enabled && <ConfirmPassword onConfirmation={enableTwoFactorAuthentication}><Button disabled={enabling}>Enable</Button></ConfirmPassword>}

                        {user.two_factor_enabled && <>

                            {confirming && <ConfirmPassword onConfirmation={confirmTwoFactorAuthentication}><Button disabled={enabling}>Confirm</Button></ConfirmPassword>}

                            {(recoveryCodes.length > 0 && !confirming) && <ConfirmPassword onConfirmation={regenerateRecoveryCodes}><Button>Regenerate Recovery Codes</Button></ConfirmPassword>}

                            {(recoveryCodes.length === 0 && !confirming) && <ConfirmPassword onConfirmation={showRecoveryCodes}><Button>Show Recovery Codes</Button></ConfirmPassword>}

                            {confirming && <ConfirmPassword onConfirmation={disableTwoFactorAuthentication}><Button disabled={disabling} theme="default">Cancel</Button></ConfirmPassword>}

                            {!confirming && <ConfirmPassword onConfirmation={disableTwoFactorAuthentication}><Button disabled={disabling} theme="danger">Disable</Button></ConfirmPassword>}

                        </>}

                    </div>
                </div>
            </div>
        </div>
    </>
}
