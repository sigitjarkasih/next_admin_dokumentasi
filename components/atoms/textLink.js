import { Typography } from "@mui/material"
import { Link } from "@mui/material"

export default function TextLink({ text, target, href, color, fontSize, fontWeight }) {
      // default
      color = color === undefined ? "inherit" : color;
      fontSize = fontSize === undefined ? 13 : fontSize;
      fontWeight = fontWeight === undefined ? "inherit" : fontWeight;
    return (
        <Link 
            target={target} 
            href={href}
            underline="none"
            color={color}
            style={{textDecoration: 'none'}}
        >
            <Typography fontWeight={fontWeight} fontSize={fontSize} style={{color: {color}, textDecoration: 'none'}}>{text}</Typography>
        </Link>
    );
}