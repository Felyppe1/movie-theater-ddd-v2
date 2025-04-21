export interface DatabaseConnector {
    query<T = any>(statement: string, params: any[] = []): Promise<T>
}
