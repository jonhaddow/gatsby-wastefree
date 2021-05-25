import React, { ReactElement } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { header } from "./Header.module.css";
import { BgImage } from "gbimage-bridge";
import { getImage } from "gatsby-plugin-image";

interface HeaderProps {
	title: string;
	description: string;
}

export const Header = (props: HeaderProps): ReactElement => {
	const { title, description } = props;

	const { placeholderImage } = useStaticQuery(
		graphql`
			query {
				placeholderImage: file(
					relativePath: { eq: "site_images/header-image.jpg" }
				) {
					childImageSharp {
						gatsbyImageData(
							layout: FULL_WIDTH
							placeholder: BLURRED
						)
					}
				}
			}
		`
	);

	const pluginImage = getImage(placeholderImage);

	return (
		<header className={header}>
			<BgImage image={pluginImage}>
				<h1 className="text-center">
					<Link
						className="text-white text-2xl sm:text-4xl md:text-5xl"
						to="/"
					>
						{title}
					</Link>
				</h1>
				<p className="text-white text-sm sm:text-base md:text-lg">
					{description}
				</p>
			</BgImage>
		</header>
	);
};