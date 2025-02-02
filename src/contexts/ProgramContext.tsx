import {createContext, useEffect, useState} from "react"



type ProgramProviderProps = {
    programName: string 
    programDescription: string   
    programAbbreviation: string
}


export const ProgramContext = createContext<ProgramProviderProps>({"programAbbreviation": "BSIT", "programDescription": "Bachelor of Science in Information Technology", "programName": "Information Technology"})