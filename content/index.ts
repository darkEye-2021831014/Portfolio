/**
 * Single entry-point for /content. Components should import from here
 * rather than reaching into individual files. Keeps copy in one place
 * and the type surface in one place.
 */

export { SITE, SOCIAL_LINKS } from "./site";
export type { SocialLink } from "./site";

export { ABOUT } from "./about";

export { CP } from "./cp";
export type { PlatformHandle } from "./cp";

export { PROJECTS } from "./projects";
export type { Project } from "./projects";

export { SKILLS } from "./skills";
export type { SkillGroup } from "./skills";

export { ACHIEVEMENTS } from "./achievements";
export type { Achievement } from "./achievements";

export { CONTACT } from "./contact";
