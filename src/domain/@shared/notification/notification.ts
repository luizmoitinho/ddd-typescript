export type NotificationErrorProps = {
    message: string
    context: string
}

export class Notification {
    private _errors: NotificationErrorProps[] = []

    addError(error: NotificationErrorProps) {
        this._errors.push(error)
    }

    message(context?: string): string{
        let message = ''

        this._errors.forEach(err => {
            if(context === undefined || context === err.context){
                message+=`${err.context}: ${err.message},`
            }
        });

        return message
    }

    hasErrors(): boolean {
        return this.errors.length > 0
    }

    get errors(): NotificationErrorProps[]{
        return this._errors
    }
}