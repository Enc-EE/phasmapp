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
            description: "Der Spirit ist eine der gewöhnlichsten Geisterarten, jedoch ist er sehr stark und gefährlich. Sie werden für gewöhnlich in einem Gebiet gefunden in dem der Tod einer Person unaufgeklärt blieb.",
            strengths: "Keine.",
            weaknesses: "Kann vorübergehend gestoppt werden, indem man den Geisterraum ausräuchert.",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.Fingerprints,
                EvidenceType.GhostWriting,
            ]
        },
        {
            name: "Gespenst",
            description: "Ein Gespenst ist einer der gefährlichsten Geister die Sie finden werden. Er ist auch bekannt dafür, fliegen und durch Wände gehen zu können.",
            strengths: "Ein Gespenst berührt nie den Boden wodurch er nicht durch Fußabdrücke gefunden werden kann.",
            weaknesses: "Giftige Reaktion zu Salz.",
            evidences: [
                EvidenceType.Fingerprints,
                EvidenceType.FreezingTemperatures,
                EvidenceType.SpiritBox,
            ]
        },
        {
            name: "Phantom",
            description: "Ein Phantom ist ein Geist, der von den Lebenden Besitz ergreifen kann. Meistens beschworen durch das Ouijaboard. Verursacht Angst in den Menschen um ihn herum.",
            strengths: "Senkt ihren Verstand stark wenn Sie das Phantom anschauen.",
            weaknesses: "Fotografieren Sie das Phantom, verschwindet es temporär.",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.GhostOrb,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "Poltergeist",
            description: "Einer der berühmtesten Geister. Ein Poltergeist ist bekannt als ein Wesen das laut ist und Objekte um sich herum manipuliert um seinen Opfern Angst einzujagen.",
            strengths: "Ein Poltergeist kann viele Objekte auf einmal werfen.",
            weaknesses: "Ein Poltergeist ist in einem leeren Raum fast ineffektiv.",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.Fingerprints,
                EvidenceType.GhostOrb,
            ]
        },
        {
            name: "Banshee",
            description: "Die Banshee ist ein Jäger und wird alles attackieren. Es ist bekannt seine Opfer zu stalken bis es jemanden tötet.",
            strengths: "Eine Banshee wird jeweils nur eine Person jagen.",
            weaknesses: "Banshees fürchten das Kruzifix und sind weniger aggresiv in seinem Umkreis.",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.Fingerprints,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "Dschinn",
            description: "Ein Dschinn ist ein territorialer Geist der bei Bedrängnis angreift. Er ist ebenfalls bekannt dafür, sich mit hoher Geschwindigkeit zu bewegen.",
            strengths: "Ein Dschinn bewegt sich schneller wenn sein Opfer weit weg ist.",
            weaknesses: "Dem Ort seinem Strom zu entziehen hindert den Dschinn am nutzen seiner Fähigkeiten.",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.GhostOrb,
                EvidenceType.EmfLevel5,
            ]
        },
        {
            name: "Mare",
            description: "Ein Mare ist die Quelle von allen Albträumen, Sie wird bei Nacht am stärksten. Es wird erzählt, dass eine Mare den Verstand von Menschen kontrollieren kann.",
            strengths: "Eine Mare hat eine erhöhte Chance anzugreifen wenn Sie sich im Dunkeln aufhalten.",
            weaknesses: "Schaltet man die Lichter um eine Mare ein ist die Chance angegriffen zu werden eher gering.",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.GhostOrb,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "Revenant",
            description: "Ein Revenant ist langsam, aber attackiert heftig und wahllos. Gerüchten zufolge ist ein Revenant schneller, wenn er jemanden jagt.",
            strengths: "Wird schneller wenn er sein Opfer jagt.",
            weaknesses: "Versteckt man sich vor dem Revenant, bewegt er sich sehr langsam.",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.Fingerprints,
                EvidenceType.GhostWriting,
            ]
        },
        {
            name: "Shade",
            description: "Der Shade ist bekannt als ein schüchterner Geist. Wenn mehrere Menschen zusammen sind, werden alle paranormale Aktivitäten gestoppt.",
            strengths: "Schüchtern zu sein bedeutet es wird schwerer den Geist zu entdecken.",
            weaknesses: "Der Geist wird nicht jagen wenn mehrere Menschen zusammen sind.",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.GhostOrb,
                EvidenceType.GhostWriting,
            ]
        },
        {
            name: "Dämon",
            description: "Ein Dämon ist mit einer der schlimmsten Geister die man finden kann. Er ist bekannt dafür, ohne Sinn und Verstand anzugreifen.",
            strengths: "Dämonen greifen viel öfter an, als andere Geister.",
            weaknesses: "Erfolgreiche Befragungen des Ouija-Boards über den Dämon verringern nicht den Geisterzustand.",
            evidences: [
                EvidenceType.SpiritBox,
                EvidenceType.GhostWriting,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "Yurei",
            description: "Ein Yurei ist ein Geist, der aus Gründen des Hasses oder einer unerfüllten Rache in die physische Welt zurückkehrte.",
            strengths: "Yurei's haben einen stärkeren Einfluss auf den Geisteszustand von Menschen.",
            weaknesses: "Wenn sie den Raum des Yurei ausräuchern, wird er für längere Zeit seine Bewegung einstellen.",
            evidences: [
                EvidenceType.GhostOrb,
                EvidenceType.GhostWriting,
                EvidenceType.FreezingTemperatures,
            ]
        },
        {
            name: "Oni",
            description: "Oni's sind verwandte des Dämons und besitzen unglaubliche Stärke. Gerüchten zufolge sind sie aktiver in der Nähe ihres Opfers.",
            strengths: "Oni's bewegen Objekte mit großer Geschwindigkeit und sind aktiver wenn Leute in der Nähe sind.",
            weaknesses: "Durch ihre hohe Aktivitätsrate sind Oni's leichter zu erkennen.",
            evidences: [
                EvidenceType.EmfLevel5,
                EvidenceType.SpiritBox,
                EvidenceType.GhostWriting,
            ]
        },
    ]
}