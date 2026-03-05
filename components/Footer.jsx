export default function Footer() {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
            <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-10 px-6 md:px-20 lg:px-40">
                <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3 text-slate-400">
                        <span className="material-symbols-outlined">restaurant_menu</span>
                        <p className="text-sm font-medium">&copy; 2026 Rutas del Sabor. Todos los derechos reservados.</p>
                    </div>
                    <div className="flex gap-8">
                        <a className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm"> Privacidad </a>
                        <a className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm"> Términos </a>
                        <a className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm"> Ayuda </a>
                    </div>
                </div>
            </footer>
        </>
    );
}