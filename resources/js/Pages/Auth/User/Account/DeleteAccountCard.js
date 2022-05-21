import React from 'react'
import { useForm } from '@inertiajs/inertia-react';
import { Button, Modal, Input } from "@/Components";

export default function DeleteAccountCard() {

    const [focusPassword, setFocusPassword] = React.useState(false)
    const [confirmingDelete, setConfirmingDelete] = React.useState(false)
    const { data, setData, errors, delete: destroy, reset } = useForm({ password: '' })

    function onSubmit(e) {
        e.preventDefault()

        destroyAccount()
    }


    function destroyAccount() {
        destroy(route('current-user.destroy'))
    }


    function closeModal() {
        reset()
        setConfirmingDelete(false)
    }

    return <>
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="md:grid md:grid-cols-3 md:gap-6 px-4 py-5 sm:p-6">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Delete Account</h3>
                    <p className="mt-1 text-sm text-gray-500">Permanently delete your account.</p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="mt-3 max-w-xl text-sm text-gray-600">
                        <p>Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.</p>
                    </div>
                    <div className="mt-5">
                        <Button theme='danger' onClick={() => setConfirmingDelete(true)}>Delete Account</Button>
                    </div>
                </div>
            </div>
        </div>


        <Modal open={confirmingDelete} width={'max-w-lg'} title="Delete Account" onClose={closeModal}>

            <div className="mt-2">
                <p className="text-sm text-gray-500">
                    Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                </p>
            </div>
            <div className="mt-2">
                <form onSubmit={onSubmit}>
                    <Input type="password" placeholder="Password" value={data.password} onBlur={() => setFocusPassword(false)} onChange={(e) => setData('password', e.target.value)} isFocused={focusPassword} id="password-field" className={'w-full'} />
                    {errors.password && <div className="text-red-500 font-medium text-sm mt-1">{errors.password}</div>}
                </form>
            </div>

            <div className="mt-6 flex items-center justify-end space-x-3">
                <Button type="button" theme={'default'} onClick={closeModal}>Cancel</Button>
                <Button theme={'danger'} onClick={destroyAccount}>Delete Account</Button>
            </div>
        </Modal>
    </>
}
