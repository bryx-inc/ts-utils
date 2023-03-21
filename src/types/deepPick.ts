import { IntersectUnion } from "./intersectUnion";
import { DeepKeyOf } from "./deepKeyOf";

/**
 * Similar functionality to the builtin `Pick<T, K>`, but allows for use of {@link DeepKeyOf}.
 *
 * @example
 * ```ts
 * type Person = {
 *   firstName: string,
 *   lastName: string,
 *   hobbies: {
 *     name: string,
 *     equipment: {
 *       name: string,
 *       cost: number
 *     }[]
 *   }[]
 * }
 *
 * type HobbySubType = DeepPick<Person, 'firstName' | 'hobbies.name' | 'hobbies.equipment.cost'>;
 * //   ^? { firstName: string } & { hobbies: { name: string }[] } & { hobbies: { equipment: { cost: number }[] }[] };
 *
 * const Joe: HobbySubType = {
 *   firstName: "Joe",
 *   hobbies: [{
 *     name: "Golfing",
 *     equipment: [{ cost: 43 }, { cost: 12 }]
 *   }]
 * }
 * ```
 */
export type DeepPick<TBase extends object, TKeys extends DeepKeyOf<TBase>> = IntersectUnion<
    {
        [K in TKeys]: K extends `${infer KHead}.${infer KTail}`
            ? KHead extends keyof TBase
                ? TBase[KHead] extends (infer InferredInner extends object)[]
                    ? KTail extends DeepKeyOf<InferredInner>
                        ? { [_ in KHead]: DeepPick<InferredInner, KTail>[] }
                        : "error: KTail extends DeepPick<InferredInner> failed!"
                    : TBase[KHead] extends infer InferredInner extends object
                    ? KTail extends DeepKeyOf<InferredInner>
                        ? { [_ in KHead]: DeepPick<InferredInner, KTail> }
                        : "error: KTail extends DeepPick<TBase[KHead]> failed!"
                    : TBase[KHead] extends (infer InferredNonNullishInnerObject extends object) | undefined /* prettier-ignore */ // *1
                    ? KTail extends DeepKeyOf<InferredNonNullishInnerObject>
                        ? { [_ in KHead]?: DeepPick<InferredNonNullishInnerObject, KTail> }
                        : "error: KTail extends DeepKeyOf<InferredNOnNullishInnerObject> failed!"
                    : "error: TBase[KHead] extends object or (object | undefined) failed!"
                : "error: KHead extends keyof TBase failed!"
            : { [_ in K]: K extends keyof TBase ? TBase[K] : `error: K doesn't match _._, but also doesn't extend keyof TBase!` };
    }[TKeys]
>;

/**
 * *1 prettier-ignore note:
 *
 * something like `TUnk extends (infer U extends object) | undefined ? <...> : never`
 * will type `U` as the object-part of `TUnk` if `TUnk` extends `object | undefined`.
 * For example, if `TUnk = { id: string } | undefined` then `U = { id: string }`.
 * Prettier, however, when formatting will remove these parenthases, resulting in
 * `TUnk extends infer U extends object | undefined ? <...> : never.
 *
 * In this case, if `TUnk = { id: string } | undefined`, then `U` would get typed
 * as `{ id: string } | undefined`, which is /not/ the behavior we desire.
 */

export type Personnel = {
    id: string;
    givenName: string;
    surname: string;
    middleNames?: string;
    namePrefix?: string;
    nameSuffix?: string;
    badgeNumber: string;
    onRoster: boolean;
    address: {
        streetAddress: string;
        city: string;
        state: string;
        zip: string;
        aptNumber?: string;
    };
    dateOfBirth?: number;
    yos: number;
    rank?: PersonnelRank;
    type?: PersonnelType;
    status?: PersonnelStatus;
    contactInfos: {
        type: string;
        value: string;
    }[];
    driversLicense?: {
        number: string;
        state: string;
        dlClass?: string;
        expiration: number;
        photos: string[];
    };
    /**
     * @deprecated
     * NOTE: this should be replaced with an Inventory object when the api is built out.
     */
    unitAssignment?: string;
    shiftAssignment?: PersonnelShiftAssignment;
    stationAssignment?: string;
    taskAssignment?: string;
    socialSecurityNumber?: string;
    medical?: {
        allergies: string[];
        medication: string[];
        doctorName?: string;
        doctorPhone?: string;
        doctorHospital?: string;
        medicalNotes?: string;
        insuranceName?: string;
        organDonor?: boolean;
    };
    physicalDescriptor?: {
        sex?: string;
        gender?: string;
        eyeColor?: string;
        height?: string;
        weight?: string;
        ethnicity?: string;
        race?: string;
    };
    religion?: string;
    emsNumber?: string;
    occupation?: string;
    maritalStatus?: string;
    educationLevel?: string;
    comments?: string;
    contacts: {
        contactType?: string;
        relationship?: string;
        contactInfos: {
            type: string;
            value: string;
        }[];
        address: {
            streetAddress: string;
            city: string;
            state: string;
            zip: string;
            aptNumber?: string;
        };
        name: string;
        description?: string;
    }[];
    teamAssignment: PersonnelTeamAssignment[];
    companyAssignment: PersonnelCompanyAssignment[];
    photoId?: string;
    organizationId: string;
    customFields: object;
};

export type PersonnelRank = {
    id: string;
    name: string;
    description?: string;
    defaultPoints?: string;
    hierarchy?: number;
    organizationId: string;
    customFields: object;
};

export type PersonnelType = {
    id: string;
    name: string;
    description?: string;
    organizationId: string;
    customFields: object;
};

export type PersonnelStatus = {
    id: string;
    name: string;
    active: boolean;
    defaultPoints?: number;
    description?: string;
    organizationId: string;
    customFields: object;
};

export type PersonnelTeamAssignment = {
    id: string;
    name: string;
    description?: string;
    organizationId: string;
    customFields: object;
};

export type PersonnelCompanyAssignment = {
    id: string;
    name: string;
    description?: string;
    organizationId: string;
    customFields: object;
};

export type PersonnelShiftAssignment = {
    id: string;
    name: string;
    description?: string;
    organizationId: string;
    customFields: object;
};

export type PesonnelHistory = {
    id: string;
    personnelId: string;
    description?: string;
    startDate: number;
    endDate?: number;
    officerAuthorization?: string;
    documentId?: string;
} & (
    | { historyType: "status"; status: string; points?: number }
    | { historyType: "type"; type: string }
    | { historyType: "company"; company: string; rank?: string }
    | { historyType: "rank"; rank: string; points?: number }
    | { historyType: "team"; team: string; rank?: string }
    | { historyType: "award" | "discipline" | "other" }
);

type _ = DeepPick<Personnel, "rank.name">;
