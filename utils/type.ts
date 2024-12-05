interface User {
    id: string;
    name: string;
    role: Role
    team: Team
    sites: Site[]
    availability: Date[]
}
interface Team {
    id: string
    name: string
    chef: User
}
interface Site {
    id: string
    name: string
    medias: URL
    status: Status
    client: string
    chef: User
    start: Date
    duration: number
    resources: Resource[]
    team: Team
}
type Status = "notstarted" | "interrupted" | "finished" | "inprogress"
type Role = "chef" | "responsable"
interface Resource {
    id: string
    name: string
    type: ResourceType
    availability: Date[]
}
type ResourceType ="vehicle" | "tool"

export type { User, Team, Site, Status, Role, Resource, ResourceType }