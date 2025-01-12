import { Github, Globe } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function Footer() {
    return (
        <footer className="border-t mt-8">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="https://github.com/PalmaAnd/standby-visualizer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-primary"
                        >
                            <Github className="h-5 w-5" />
                            <span>GitHub Repository</span>
                        </Link>
                        <Link
                            href="https://palma-andre.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-primary"
                        >
                            <Globe className="h-5 w-5" />
                            <span>My Website</span>
                        </Link>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="link" size="sm">Privacy Policy</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Privacy Policy</DialogTitle>
                                    <DialogDescription>
                                        <div className="mt-4 space-y-4">
                                            <p>Last updated: {new Date().toLocaleDateString()}</p>
                                            <h3 className="text-lg font-semibold">1. Data Collection</h3>
                                            <p>
                                                This website does not collect any personal data. We do not use cookies or any other tracking mechanisms.
                                            </p>
                                            <h3 className="text-lg font-semibold">2. Usage Data</h3>
                                            <p>
                                                All interactions with this visualization tool happen locally in your browser. No data is sent to our servers.
                                            </p>
                                            <h3 className="text-lg font-semibold">3. Third-Party Services</h3>
                                            <p>
                                                This website is hosted on Netlify and uses GitHub for version control. Please refer to their respective privacy policies for more information.
                                            </p>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="link" size="sm">Terms of Service</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Terms of Service</DialogTitle>
                                    <DialogDescription>
                                        <div className="mt-4 space-y-4">
                                            <p>Last updated: {new Date().toLocaleDateString()}</p>
                                            <h3 className="text-lg font-semibold">1. License</h3>
                                            <p>
                                                This project is open source and available under the MIT License. You are free to use, modify, and distribute this software according to the terms of the license.
                                            </p>
                                            <h3 className="text-lg font-semibold">2. Disclaimer</h3>
                                            <p>
                                                This visualization tool is provided &quot;as is&quot; without warranty of any kind. The developers are not responsible for any decisions made based on this visualization.
                                            </p>
                                            <h3 className="text-lg font-semibold">3. Usage</h3>
                                            <p>
                                                You may use this tool for educational and commercial purposes. Attribution is appreciated but not required.
                                            </p>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="link" size="sm">Legal Notice</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Legal Notice</DialogTitle>
                                    <DialogDescription>
                                        <div className="mt-4 space-y-4">
                                            <h3 className="text-lg font-semibold">Responsible for Content</h3>
                                            <p>
                                                André Palma<br />
                                                Website: <Link href="https://palma-andre.netlify.app/" className="text-primary hover:underline">https://palma-andre.netlify.app/</Link>
                                            </p>
                                            <h3 className="text-lg font-semibold">Contact</h3>
                                            <p>
                                                For any inquiries, please use the GitHub repository&apos;s issue tracker or contact form on the developer website.
                                            </p>
                                            <h3 className="text-lg font-semibold">Copyright</h3>
                                            <p>
                                                © {new Date().getFullYear()} André Palma. All rights reserved.
                                            </p>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </footer>
    )
}

