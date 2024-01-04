<script lang="ts">
    import List from "$lib/components/group-details/list.svelte";
    import Table from "$lib/components/group-details/table.svelte";
	import Window from "$lib/components/window.svelte";

    export let title: string;
</script>

<Window title={title} windowRenderLevel={2}>
    <div class="h-full relative">
        <div class="absolute bg-white bottom-0 divide-gray-100 divide-y left-0 right-0 text-black top-0 overflow-y-auto">
            <Table summary={{
                "Alejandro": 250,
                "Lucas": 250,
                "Miguel": -500
            }} />
            <List trans={[
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "15c82b84-1fbd-4a42-bdce-5e51ff56cc5c"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "8c94b879-17ea-4a84-9ffc-e99ecf06952e"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "dcadc69a-63d4-456e-879f-6e2c7773f3bd"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "e9fb4077-3a77-4a7f-98c9-7c0e4178a6f4"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "3c5faf8f-7276-49e9-b8d7-9480d08c394e"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "d70dd1b1-a20a-48a2-bcfb-9ad2ff009b7e"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "2e508673-5688-4aa9-8487-3a25c40fbc0d"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "586f4268-597f-4fdc-a844-d4bc3eb70797"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "9cc009dc-a6a0-484f-a0ec-83b3346981a9"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "818dd26c-fe9f-43c5-8533-0c22e7faebf7"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "1baab5df-11cd-44f0-844b-4dd6e18dd1d2"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "d6adbafd-3d29-40df-ab4f-b73ab45d8774"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "eaeb022c-9738-4595-9b7a-901dd33e2e5e"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "2eaf0d8a-c4bb-4935-93af-9cbba7c37a0e"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "16e062cc-d7b8-4d6e-8607-fb404fa8afa3"
                },
                {
                  "categories": ["Snacks"],
                  "concept": "Party snacks",
                  "date": 1704381055,
                  "debtShares": {"1":5, "2":5, "3":5, "4":5},
                  "gid": "755361a8-c4aa-429f-a89b-066d2fef5553",
                  "payments": {"1":400, "2":400, "3":400,"4":400},
                  "tid": "bd3a8446-44a0-4376-b1f6-68bf3911819a"
                }
              ]} selectedTran="" />
        </div>
    </div>
</Window>
