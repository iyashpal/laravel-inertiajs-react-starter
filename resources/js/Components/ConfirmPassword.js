import Modal from "./Modal"
import Input from './Input'
import Button from './Button'
import { useState } from "react"

export default function ConfirmPassword({ title = null, description = null, confirmLabel = 'Confirm', cancelLabel = 'Cancel', width = 'max-w-md', children, onConfirmation = () => { } }) {

    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const [processing, setProcessing] = useState('')
    const [focusPassword, setFocusPassword] = useState(false)
    const [confirmingPassword, setConfirmingPassword] = useState(false)

    function startConfirmingPassword() {

        axios.get(route('password.confirmation')).then(({ data }) => {

            if (data.confirmed) {

                onConfirmation()

            } else {

                setConfirmingPassword(true)

                setTimeout(() => setFocusPassword(true), 250);

            }

        });
    };

    function onSubmit(e) {
        e.preventDefault()

        confirmPassword()
    }


    function confirmPassword() {

        setError('')

        setProcessing(true)

        axios.post(route('password.confirm'), { password })
            .then(() => {

                setProcessing(false)

                closeModal();

                onConfirmation()

            }).catch(({ response }) => {

                setProcessing(false)

                setError(response.data.errors.password[0])

                setFocusPassword(true)
            });
    };



    function closeModal() {

        setError('')

        setPassword('')

        setProcessing(false)

        setConfirmingPassword(false)

    }

    return <>
        <span onClick={startConfirmingPassword}>
            {children}
        </span>

        <Modal open={confirmingPassword} title={title ? title : 'Confirm Password'} width={width} onClose={closeModal}>

            <div className="mt-2">
                <p className="text-sm text-gray-500">
                    {description ? description : 'For your security, please confirm your password to continue.'}
                </p>
            </div>
            <div className="mt-2">
                <form onSubmit={onSubmit}>
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} isFocused={focusPassword} id="password-field" className={'w-full'} />
                    {error && <div className="text-red-500 font-medium text-sm mt-1">{error}</div>}
                </form>
            </div>

            <div className="mt-4 flex items-center justify-end space-x-3">
                <Button type="button" theme={'default'} onClick={closeModal}>{cancelLabel}</Button>
                <Button processing={processing} onClick={confirmPassword}>{confirmLabel}</Button>
            </div>
        </Modal>
    </>
}
