import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import { useForm } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

export default function UpdatePasswordCard({ user }) {
    const [isSuccess, setIsSuccess] = useState(false)
    const { data, setData, errors, put, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    function onSubmit(e) {
        e.preventDefault()

        put(route('user-password.update'), {
            preserveScroll: true,
            errorBag: 'updatePassword',
            onSuccess: () => {
                setIsSuccess(true)
                reset()
            },
            onError() {
                if (errors?.updatePassword.password) {
                    reset('password', 'password_confirmation')
                }

                if (error?.updatePassword.current_password) {
                    reset('current_password')
                }
            },
        })
    }
    return <>
        <form onSubmit={onSubmit}>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="md:grid md:grid-cols-3 md:gap-6 px-4 py-5 sm:p-6">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Update Password</h3>
                        <p className="mt-1 text-sm text-gray-500">Ensure your account is using a long, random password to stay secure.</p>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        
                        {isSuccess && <>
                            <div className="py-3 px-4 bg-green-100 border border-green-400 text-green-600 font-semibold rounded-md mb-4">
                                Password successfully updated.
                            </div>
                        </>}

                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6">
                                <Label forInput={'current-password'} value={'Current password'} />
                                <Input type="password" id="current-password" autoComplete="current-password" className={'w-full mt-1'} onChange={(e) => setData('current_password', e.target.value)} value={data.current_password} />
                                {errors.current_password && (<p className="text-sm font-semibold text-red-500">{errors.current_password}</p>)}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <Label forInput={'new-password'} value={'Password'} />
                                <Input type="password" id="new-password" autoComplete={'new-password'} className={'w-full mt-1'} onChange={(e) => setData('password', e.target.value)} value={data.password} />
                                {errors.password && (<p className="text-sm font-semibold text-red-500">{errors.password}</p>)}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <Label forInput={'confirm-password'} value={'Confirm password'} />
                                <Input type="password" id="confirm-password" autoComplete={'confirm-password'} className={'w-full mt-1'} onChange={(e) => setData('password_confirmation', e.target.value)} value={data.password_confirmation} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-4 sm:px-6 bg-slate-50 border-0">
                    <div className="flex justify-end items-center">
                        <Button type="submit">Update</Button>
                    </div>
                </div>
            </div>
        </form>
    </>
}
