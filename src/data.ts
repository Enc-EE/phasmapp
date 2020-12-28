export enum EvidenceType {
    EmfLevel5,
    Fingerprints,
    FreezingTemperatures,
    SpiritBox,
    GhostWriting,
    GhostOrb,
}

export interface Evidence {
    name: string
    type: EvidenceType
}

export interface Ghost {
    name: string,
    description: string,
    strengths: string,
    weaknesses: string,
    evidences: EvidenceType[]
}

export interface Data {
    ghosts: Ghost[]
    evidences: Evidence[]
}

export const DATA: Data = {
    evidences: [
        {
            name: "data.evidence.EmfLevel5.name",
            type: EvidenceType.EmfLevel5,
        },
        {
            name: "data.evidence.Fingerprints.name",
            type: EvidenceType.Fingerprints,
        },
        {
            name: "data.evidence.FreezingTemperatures.name",
            type: EvidenceType.FreezingTemperatures,
        },
        {
            name: "data.evidence.SpiritBox.name",
            type: EvidenceType.SpiritBox,
        },
        {
            name: "data.evidence.GhostWriting.name",
            type: EvidenceType.GhostWriting,
        },
        {
            name: "data.evidence.GhostOrb.name",
            type: EvidenceType.GhostOrb,
        },
    ],
    ghosts: [
        {
            name: "data.ghost.Spirit.name",
            description: "data.ghost.Spirit.description",
            strengths: "data.ghost.Spirit.strenghts",
            weaknesses: "data.ghost.Spirit.weaknesses",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.Fingerprints,
                EvidenceType.GhostWriting,
            ]
        },
        {
            name: "data.ghost.Wraith.name",
            description: "data.ghost.Wraith.description",
            strengths: "data.ghost.Wraith.strenghts",
            weaknesses: "data.ghost.Wraith.weaknesses",
            evidences: [
                EvidenceType.Fingerprints,
                EvidenceType.FreezingTemperatures,
                EvidenceType.SpiritBox,
            ]
        },
        {
            name: "data.ghost.Phantom.name",
            description: "data.ghost.Phantom.description",
            strengths: "data.ghost.Phantom.strenghts",
            weaknesses: "data.ghost.Phantom.weaknesses",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.GhostOrb,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "data.ghost.Poltergeist.name",
            description: "data.ghost.Poltergeist.description",
            strengths: "data.ghost.Poltergeist.strenghts",
            weaknesses: "data.ghost.Poltergeist.weaknesses",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.Fingerprints,
                EvidenceType.GhostOrb,
            ]
        },
        {
            name: "data.ghost.Banshee.name",
            description: "data.ghost.Banshee.description",
            strengths: "data.ghost.Banshee.strenghts",
            weaknesses: "data.ghost.Banshee.weaknesses",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.Fingerprints,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "data.ghost.Jinn.name",
            description: "data.ghost.Jinn.description",
            strengths: "data.ghost.Jinn.strenghts",
            weaknesses: "data.ghost.Jinn.weaknesses",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.GhostOrb,
                EvidenceType.EmfLevel5,
            ]
        },
        {
            name: "data.ghost.Mare.name",
            description: "data.ghost.Mare.description",
            strengths: "data.ghost.Mare.strenghts",
            weaknesses: "data.ghost.Mare.weaknesses",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.GhostOrb,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "data.ghost.Revenant.name",
            description: "data.ghost.Revenant.description",
            strengths: "data.ghost.Revenant.strenghts",
            weaknesses: "data.ghost.Revenant.weaknesses",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.Fingerprints,
                EvidenceType.GhostWriting,
            ]
        },
        {
            name: "data.ghost.Shade.name",
            description: "data.ghost.Shade.description",
            strengths: "data.ghost.Shade.strenghts",
            weaknesses: "data.ghost.Shade.weaknesses",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.GhostOrb,
                EvidenceType.GhostWriting,
            ]
        },
        {
            name: "data.ghost.Demon.name",
            description: "data.ghost.Demon.description",
            strengths: "data.ghost.Demon.strenghts",
            weaknesses: "data.ghost.Demon.weaknesses",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.GhostWriting,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "data.ghost.Yurei.name",
            description: "data.ghost.Yurei.description",
            strengths: "data.ghost.Yurei.strenghts",
            weaknesses: "data.ghost.Yurei.weaknesses",
            evidences: [
                EvidenceType.GhostOrb,
                EvidenceType.GhostWriting,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "data.ghost.Oni.name",
            description: "data.ghost.Oni.description",
            strengths: "data.ghost.Oni.strenghts",
            weaknesses: "data.ghost.Oni.weaknesses",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.SpiritBox,
                EvidenceType.GhostWriting,
            ]
        },
    ]
}