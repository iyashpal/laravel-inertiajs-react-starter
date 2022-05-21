import { useState } from 'react'
import Modal from "@/Components/Modal"
import Input from '@/Components/Input'
import Button from "@/Components/Button"
import { useForm } from '@inertiajs/inertia-react'
import { DesktopComputerIcon, DeviceMobileIcon, CursorClickIcon } from "@heroicons/react/outline"

export default function BrowserSessionsCard({ sessions }) {



    const [focusPassword, setFocusPassword] = useState(false)
    const [confirmingLogout, setConfirmingLogout] = useState(false)
    const { setData, data, errors, processing, delete: destroy, reset } = useForm({ password: '' })

    function confirmLogout() {

        setConfirmingLogout(true)

        setTimeout(() => setFocusPassword(true), 250);
    };

    function logoutOtherBrowserSessions() {
        destroy(route('logout-sessions.destroy'), {

            preserveScroll: true,

            onFinish: () => reset(),

            onSuccess: () => closeModal(),

            onError: () => setFocusPassword(true),

        })
    }

    function onSubmit(e) {
        e.preventDefault()
        logoutOtherBrowserSessions()
    }

    function closeModal() {
        reset()

        setConfirmingLogout(false)
    }

    return <>
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="md:grid md:grid-cols-3 md:gap-6 px-4 py-5 sm:p-6">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Browser Sessions</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage and log out your active sessions on other browsers and devices.</p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="mt-3 max-w-xl text-sm text-gray-600">
                        <p>If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password.</p>
                    </div>
                    <div className="mt-5 space-y-6">
                        {[...sessions].map(({ agent, ip_address, is_current_device, last_active }, key) => (
                            <div className="flex items-center" key={key}>
                                <div>
                                    {agent.is_desktop && <DesktopComputerIcon className={'w-8 h-8 text-gray-500'} />}
                                    {agent.is_mobile && <DeviceMobileIcon className={'w-8 h-8 text-gray-500'} />}
                                    {agent.is_robot && <CursorClickIcon className={'w-8 h-8 text-gray-500'} />}
                                </div>
                                <div className="ml-3">
                                    <div className="text-sm text-gray-600">{agent.platform} - {agent.browser} ({agent.version})</div>
                                    <div>
                                        <div className="text-xs text-gray-500">
                                            {ip_address},&nbsp;
                                            <span className={`${is_current_device && 'text-green-500 font-semibold'}`}>
                                                {is_current_device ? 'This device' : last_active}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center mt-5">

                        <Button className="uppercase" onClick={confirmLogout}>Log out other browser sessions</Button>

                    </div>
                </div>
            </div>
        </div>

        <Modal open={confirmingLogout} width={'max-w-lg'} title="Log Out Other Browser Sessions" onClose={closeModal}>

            <div className="mt-2">
                <p className="text-sm text-gray-500">
                    Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices.
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
                <Button processing={processing} onClick={logoutOtherBrowserSessions}>Log out other browser sessions</Button>
            </div>
        </Modal>
    </>
}
