import "../css/FooterComponent.css"

export default function Footer(props: {footerText ?: string}) {
    if (!props.footerText) return ( <span  className="footer">© 2024 Image Gallery Website</span> )
    return ( <span  className="footer">{props.footerText}</span> )
}