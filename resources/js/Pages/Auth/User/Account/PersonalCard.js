import { Button, Input, Label } from '@/Components'
import { useForm } from '@inertiajs/inertia-react'
import { useState } from 'react'

export default function PersonalCard({ user }) {

    const [isSuccess, setIsSuccess] = useState(false)
    const { data, setData, errors, put } = useForm({
        name: user.name,
        email: user.email,
        photo: null,
    })

    function onSubmit(e) {
        e.preventDefault()
        put(route('user-profile-information.update'), {
            errorBag: 'updateProfileInformation',
            preserveScroll: true,
            onSuccess: () => {
                setIsSuccess(true)
            }
        })

    }
    return <>
        <form onSubmit={onSubmit}>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="md:grid md:grid-cols-3 md:gap-6 px-4 py-5 sm:p-6">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                        <p className="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        {isSuccess && <>
                            <div className="py-3 px-4 bg-green-100 border border-green-400 text-green-600 font-semibold rounded-md mb-4">
                                Profile successfully updated.
                            </div>
                        </>}

                        <div className="grid grid-cols-6 gap-6">

                            <div className="col-span-6">
                                <Label value={'Profile Photo'} className={'mb-3'} />
                                <div className="mt-1 flex space-x-4 items-center">
                                    <div>
                                        <img src={user.avatar} className={'w-20 h-20 rounded-full'} />
                                    </div>
                                    <div className='text-sm text-gray-600'>
                                        <p>For profile photo we are using <a href="https://en.gravatar.com/" target={'_blank'} className={'text-blue-500 underline'}>Gravatar</a> service behind the scene.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-6">
                                <Label forInput={'name'} value={'Full Name'} />
                                <Input type="text" name="name" id="name" value={data.name} autoComplete="given-name" className={'w-full mt-1'} onChange={(e) => setData('name', e.target.value)} />
                            </div>

                            <div className="col-span-6">
                                <Label forInput={'email-address'} value={'Email address'} />
                                <Input type="email" id="email-address" autoComplete={'email'} disabled={true} value={user.email} className={'w-full mt-1 text-gray-500'} />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="px-4 py-4 sm:px-6 bg-slate-50 border-0">
                    <div className="flex justify-end items-center">
                        <Button type='submit'>Update</Button>
                    </div>
                </div>
            </div>
        </form>
    </>
}
