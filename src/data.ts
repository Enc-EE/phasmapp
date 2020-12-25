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
    evidences: EvidenceType[]
}

export interface Data {
    ghosts: Ghost[]
    evidences: Evidence[]
}

export const DATA: Data = {
    evidences: [
        {
            name: "EMF Level 5",
            type: EvidenceType.EmfLevel5,
        },
        {
            name: "Fingerabdrücke",
            type: EvidenceType.Fingerprints,
        },
        {
            name: "Gefriertemperatur",
            type: EvidenceType.FreezingTemperatures,
        },
        {
            name: "Geisterbox",
            type: EvidenceType.SpiritBox,
        },
        {
            name: "Geisterbuch",
            type: EvidenceType.GhostWriting,
        },
        {
            name: "Geisterorb",
            type: EvidenceType.GhostOrb,
        },
    ],
    ghosts: [
        {
            name: "Spirit",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.Fingerprints,
                EvidenceType.GhostWriting,
            ]
        },
        {
            name: "Gespenst",
            evidences: [
                EvidenceType.Fingerprints,
                EvidenceType.FreezingTemperatures,
                EvidenceType.SpiritBox,
            ]
        },
        {
            name: "Phantom",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.GhostOrb,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "Poltergeist",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.Fingerprints,
                EvidenceType.GhostOrb,
            ]
        },
        {
            name: "Banshee",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.Fingerprints,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "Dschinn",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.GhostOrb,
                EvidenceType.EmfLevel5,
            ]
        },
        {
            name: "Mare",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.GhostOrb,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "Revenant",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.Fingerprints,
                EvidenceType.GhostWriting,
            ]
        },
        {
            name: "Shade",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.GhostOrb,
                EvidenceType.GhostWriting,
            ]
        },
        {
            name: "Dämon",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.GhostWriting,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "Yurei",
            evidences: [
                EvidenceType.GhostOrb,
                EvidenceType.GhostWriting,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "Oni",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.SpiritBox,
                EvidenceType.GhostWriting,
            ]
        },
    ]
}