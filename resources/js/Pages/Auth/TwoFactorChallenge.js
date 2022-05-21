import Guest from "@/Layouts/Guest"
import { useState, useRef } from 'react'
import { Input, Label } from '@/Components'
import { Head, useForm } from '@inertiajs/inertia-react'

export default function TwoFactorChallenge() {

    const [recovery, setRecovery] = useState(false)
    const [focusCode, setFocusCode] = useState(false)
    const [focusRecovery, setFocusRecovery] = useState(false)

    const { data, setData, post, processing, errors } = useForm({
        code: "",
        recovery_code: "",
    })

    function submit(e) {
        e.preventDefault()
        post(route('two-factor.login'))
    }


    function toggleRecovery() {
        if (recovery) {
            setRecovery(false)
            setFocusCode(true)
            setData('recovery_code', '')
        } else {
            setRecovery(true)
            setData('code', '')
            setFocusRecovery(true)
        }
    }

    return <>
        <Guest>
            <Head title="Two Factor Challenge" />

            <div className="mb-4 text-sm text-gray-600">
                {recovery && (`Please confirm access to your account by entering one of your emergency recovery codes.`)}
                {!recovery && (`Please confirm access to your account by entering the authentication code provided by your authenticator application.`)}
            </div>


            <form onSubmit={submit}>

                {!recovery && (
                    <div>
                        <Label forInput="code" value="Code" />
                        <Input
                            autoFocus
                            id="code"
                            type="text"
                            value={data.code}
                            inputMode="numeric"
                            isFocused={focusCode}
                            autoComplete="one-time-code"
                            className="mt-1 block w-full"
                            onChange={e => setData('code', e.target.value)}
                        />
                    </div>
                )}


                {recovery && (
                    <div>
                        <Label forInput="recovery_code" value="Recovery Code" />
                        <Input
                            type="text"
                            id="recovery_code"
                            isFocused={focusRecovery}
                            value={data.recovery_code}
                            autoComplete="one-time-code"
                            className="mt-1 block w-full"
                            onChange={e => setData('recovery_code', e.target.value)}
                        />
                    </div>
                )}
                {errors.code && (<p className="text-sm text-red-500 font-medium mt-2">{errors.code}</p>)}

                <div className="flex items-center justify-end mt-4">
                    <button type="button" onClick={toggleRecovery} className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer">
                        {!recovery && (`Use a recovery code`)}
                        {recovery && (`Use an authentication code`)}
                    </button>

                    <button className={`tw-btn tw-btn-secondary ml-4 disabled:opacity-25`} disabled={processing} >Log in</button>
                </div>
            </form >
        </Guest >
    </>
}
