declare module 'virtual:ui-component-docs' {
  export interface PropDoc {
    name: string;
    type: string;
    options: string[];
    required: boolean;
    defaultValue: string | null;
    description: string;
  }

  export interface ComponentDoc {
    name: string;
    group: string;
    description: string;
    example: string | null;
    props: PropDoc[];
  }

  const components: ComponentDoc[];
  export default components;
}
