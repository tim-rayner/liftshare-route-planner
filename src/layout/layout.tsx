import './layout.css';

function Layout({children} : any){
    return (
        <div className="content">
            {children}
        </div>
    )
}

export default Layout; 