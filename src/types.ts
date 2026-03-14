export const UiElementSize = {
    Small: 'small',
    Medium: 'medium',
    Large: 'large',
} as const;

export type UiElementSize = (typeof UiElementSize)[keyof typeof UiElementSize];

export const UiSemanticVariant = {
    Custom: 'custom',
    Neutral: 'neutral',
    Primary: 'primary',
    Success: 'success',
    Warning: 'warning',
    Danger: 'danger',
    Info: 'info',
} as const;

export type UiSemanticVariant =
    (typeof UiSemanticVariant)[keyof typeof UiSemanticVariant];
