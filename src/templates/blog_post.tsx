import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Styling from "./post.module.scss";
import Img from "gatsby-image";
import Post from "../common/post";

interface GraphQLSchema {
	markdownRemark: Post;
}

function BlogPost(props: { data: GraphQLSchema }): JSX.Element {
	const {
		html,
		frontmatter: { title, featuredImage, date: dateStr }
	} = props.data.markdownRemark;

	const featuredImgFluid = featuredImage.childImageSharp.fluid;
	const aspectRatio = featuredImgFluid.aspectRatio;
	const ratioClass = aspectRatio <= 0.8 ? Styling.portrait : "";

	const articleElements: JSX.Element[] = [];

	articleElements.push(
		<div
			key="featuredImage"
			className={`${Styling.featuredImageWrapper} ${ratioClass}`}
		>
			<Img
				style={{ maxHeight: "100%", maxWidth: "100%" }}
				imgStyle={{ objectFit: "contain" }}
				fluid={featuredImgFluid}
			/>
		</div>,
		<h1 key="title">{title}</h1>
	);

	const dateExists = dateStr != null;
	if (dateExists) {
		const date = new Date(dateStr);
		articleElements.push(
			<time key="datetime">
				{date.toLocaleDateString("en-GB", {
					day: "numeric",
					month: "short",
					year: "numeric"
				})}
			</time>
		);
	}

	articleElements.push(
		<div
			key="html"
			dangerouslySetInnerHTML={{
				__html: html
			}}
		/>
	);

	return (
		<Layout>
			<section>
				<article className={Styling.post}>{articleElements}</article>
			</section>
		</Layout>
	);
}

export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				featuredImage {
					childImageSharp {
						fluid {
							...GatsbyImageSharpFluid
						}
					}
				}
				title
				date
			}
		}
	}
`;

export default BlogPost;
