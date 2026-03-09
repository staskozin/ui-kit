export const UiElementSize = {
    Small: 'small',
    Medium: 'medium',
    Large: 'large',
} as const;

export type UiElementSize = (typeof UiElementSize)[keyof typeof UiElementSize];
