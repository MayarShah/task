import { storeToRefs } from "pinia";
import { useOrderStore } from "~/stores/order";
import type { ApiError } from "~/types/ApiError";

export const useCheckout = () => {
  const router = useRouter();
  const orderStore = useOrderStore();

  const { color, motiv, totalPrice } = storeToRefs(orderStore);
  const { resetOrder } = orderStore;

  const name = ref("");
  const address = ref("");

  const errors = ref<{ name?: string[]; address?: string[] }>({});
  const generalError = ref<string | null>(null);
  const loading = ref(false);

  const canSubmit = computed(() => {
    return (
      !!name.value &&
      !!address.value &&
      !!color.value &&
      !!motiv.value &&
      !loading.value
    );
  });

  const clearErrors = () => {
    errors.value = {};
    generalError.value = null;
  };

  const submit = async () => {
    if (loading.value) return;
    if (!canSubmit.value) return;

    loading.value = true;
    clearErrors();

    try {
      await $fetch("/api/order", {
        method: "POST",
        body: {
          name: name.value,
          address: address.value,
          colorId: color.value?.name,
          motivId: motiv.value?.name,
        },
      });
      await router.push("/success");
      resetOrder();
    } catch (err: unknown) {
      const e = err as ApiError;

      if (e?.data) {
        errors.value = e.data.errors ?? {};
        generalError.value = e.data.message ?? null;
      } else {
        generalError.value = "Something went wrong";
      }
    } finally {
      loading.value = false;
    }
  };

  const resetForm = () => {
    name.value = "";
    address.value = "";
    clearErrors();
  };

  return {
    name,
    address,
    errors,
    generalError,
    loading,

    color,
    motiv,
    totalPrice,

    submit,
    canSubmit,
    resetForm,
  };
};
